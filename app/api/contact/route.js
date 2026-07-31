import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return Response.json({ unauthorized: true })
    }

    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get("page")) || 1
    const limit = parseInt(searchParams.get("limit")) || 20
    const search = searchParams.get("search") || ""

    const sort = searchParams.get("sort")
    const fromDate = searchParams.get("fromDate")
    const toDate = searchParams.get("toDate")

    const status = searchParams.get("status")
    const goal = searchParams.get("goal")
    const program = searchParams.get("program")
    const dateFilter = searchParams.get("dateFilter")

    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db("roofers")

    let query = {}

    // 🔍 Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { ip: { $regex: search, $options: "i" } }
      ]
    }

    // 🎯 Filters
    if (status) query.status = status
    if (goal) query.goal = goal
    if (program) query.program = program

    // 📅 Date Handling (PRIORITY LOGIC)

    // 👉 Custom date range (highest priority)
    if (fromDate || toDate) {
      query.createdAt = {}

      if (fromDate) {
        query.createdAt.$gte = new Date(fromDate)
      }

      if (toDate) {
        const to = new Date(toDate)
        to.setHours(23, 59, 59, 999)
        query.createdAt.$lte = to
      }
    }

    // 👉 Quick filters (only if no custom date)
    else if (dateFilter && dateFilter !== "All") {
      const now = new Date()
      let from = new Date()

      if (dateFilter === "Today") {
        from.setHours(0, 0, 0, 0)
      } else if (dateFilter === "Last3") {
        from.setDate(now.getDate() - 3)
      } else if (dateFilter === "Last7") {
        from.setDate(now.getDate() - 7)
      } else if (dateFilter === "Last30") {
        from.setDate(now.getDate() - 30)
      }

      query.createdAt = { $gte: from }
    }

    // 🔽 Sorting
    let sortOption = { createdAt: -1 }

    if (sort === "oldest") sortOption = { createdAt: 1 }
    if (sort === "name") sortOption = { name: 1 }

    const contactsRaw  = await db
      .collection("contacts")
      .find(query)
      .sort(sortOption) // ✅ FIXED
      .skip(skip)
      .limit(limit)
      .toArray()
const contacts = contactsRaw.map((item) => ({
  ...item,
  source: item.source || "direct",
  medium: item.medium || "website",
  campaign: item.campaign || "default",
}))
    const total = await db.collection("contacts").countDocuments(query)

    return Response.json({
      data: contacts,
      pages: Math.ceil(total / limit)
    })

  } catch (error) {
    console.error(error)
    return Response.json({ error: true })
  }
}
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      subject,
      mobile,
      message,
      website,
      tracking = {},
    } = body;

    // Honeypot
    if (website) {
      return NextResponse.json(
        { success: false, message: "Spam detected." },
        { status: 400 }
      );
    }

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!subject?.trim()) {
      return NextResponse.json(
        { success: false, message: "Subject is required." },
        { status: 400 }
      );
    }
const cleanMobile = mobile?.replace(/\D/g, "");
if (!/^[6-9]\d{9}$/.test(cleanMobile || "")) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid mobile number.",
    },
    { status: 400 }
  );
}
    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be at least 10 characters.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("roofers"); // Uses DB from your MongoDB URI

    const document = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
mobile: cleanMobile,
      tracking,

      serverTracking: {
        ip:
          req.headers.get("x-forwarded-for") ||
          req.headers.get("x-real-ip") ||
          "",

        userAgent: req.headers.get("user-agent") || "",

        country: req.headers.get("x-vercel-ip-country") || "",

        region:
          req.headers.get("x-vercel-ip-country-region") || "",

        city: req.headers.get("x-vercel-ip-city") || "",
      },

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("contacts")
      .insertOne(document);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}