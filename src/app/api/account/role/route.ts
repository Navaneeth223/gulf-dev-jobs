import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Employer } from "@/models/Employer";
import { User } from "@/models/User";
import { isUserRole } from "@/types/roles";

interface RoleBody {
  role?: unknown;
  companyName?: unknown;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let body: RoleBody;
  try {
    body = (await request.json()) as RoleBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isUserRole(body.role)) {
    return NextResponse.json({ error: "Choose employer or candidate." }, { status: 400 });
  }

  const companyName =
    typeof body.companyName === "string" ? body.companyName.trim() : "";
  if (body.role === "employer" && !companyName) {
    return NextResponse.json({ error: "Company name is required for employers." }, { status: 400 });
  }

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  if (user.role) {
    return NextResponse.json({ error: "Role is already set." }, { status: 409 });
  }

  user.role = body.role;
  if (body.role === "employer") {
    user.companyName = companyName;
    await Employer.create({
      userId: new Types.ObjectId(String(user._id)),
      companyName,
    });
  }
  await user.save();

  return NextResponse.json({ ok: true, role: user.role });
}
