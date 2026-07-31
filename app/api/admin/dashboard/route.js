import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
     const client = await clientPromise
     const db = client.db("roofers")

    const blogs = db.collection("blogs");
    const categories = db.collection("categories");
    const contacts = db.collection("contacts");
    const newsletter = db.collection("newsletter");
    const testimonials = db.collection("testimonials");
    const users = db.collection("users");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalCategories,
      totalContacts,
      totalNewsletter,
      totalTestimonials,
      totalStaff,

      todayBlogs,
      todayContacts,
      todayNewsletter,
      todayTestimonials,
      todayStaff,

      recentBlogs,
      recentContacts,
      recentNewsletter,
      recentTestimonials,

      monthlyBlogs,
      monthlyContacts,
      monthlyNewsletter,
      monthlyTestimonials,

      topCategories
    ] = await Promise.all([

      blogs.countDocuments(),
      blogs.countDocuments({ status: "published" }),
      blogs.countDocuments({ status: "draft" }),

      categories.countDocuments(),

      contacts.countDocuments(),

      newsletter.countDocuments(),

      testimonials.countDocuments(),

      users.countDocuments(),

      blogs.countDocuments({
        createdAt: { $gte: today }
      }),

      contacts.countDocuments({
        createdAt: { $gte: today }
      }),

      newsletter.countDocuments({
        createdAt: { $gte: today }
      }),

      testimonials.countDocuments({
        createdAt: { $gte: today }
      }),

      users.countDocuments({
        createdAt: { $gte: today }
      }),

      blogs.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            title: 1,
            slug: 1,
            status: 1,
            createdAt: 1,
            category: "$category.name"
          }
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5 }
      ]).toArray(),

      contacts
        .find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),

      newsletter
        .find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),

      testimonials
        .find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),

      blogs.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            total: { $sum: 1 }
          }
        },
        { $sort: { "_id.month": 1 } }
      ]).toArray(),

      contacts.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            total: { $sum: 1 }
          }
        },
        { $sort: { "_id.month": 1 } }
      ]).toArray(),

      newsletter.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            total: { $sum: 1 }
          }
        },
        { $sort: { "_id.month": 1 } }
      ]).toArray(),

      testimonials.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            total: { $sum: 1 }
          }
        },
        { $sort: { "_id.month": 1 } }
      ]).toArray(),

      blogs.aggregate([
        {
          $group: {
            _id: "$category",
            total: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: "$category"
        },
        {
          $project: {
            _id: 0,
            category: "$category.name",
            total: 1
          }
        },
        {
          $sort: {
            total: -1
          }
        }
      ]).toArray()

    ]);

    return NextResponse.json({
      success: true,

      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalCategories,
        totalContacts,
        totalNewsletter,
        totalTestimonials,
        totalStaff
      },

      today: {
        blogs: todayBlogs,
        contacts: todayContacts,
        newsletter: todayNewsletter,
        testimonials: todayTestimonials,
        staff: todayStaff
      },

      recent: {
        blogs: recentBlogs,
        contacts: recentContacts,
        newsletter: recentNewsletter,
        testimonials: recentTestimonials
      },

      charts: {
        monthlyBlogs,
        monthlyContacts,
        monthlyNewsletter,
        monthlyTestimonials,

        blogStatus: {
          published: publishedBlogs,
          draft: draftBlogs
        },

        topCategories
      }
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}