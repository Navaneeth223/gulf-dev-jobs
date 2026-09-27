import { hash } from "bcryptjs";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Employer } from "@/models/Employer";
import { User } from "@/models/User";
import { isUserRole } from "@/types/roles";

interface RegisterBody {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  role?: unknown;
  companyName?: unknown;
}

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = body.role;
  const companyName =
    typeof body.companyName === "string" ? body.companyName.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }
  if (!isUserRole(role)) {
    return NextResponse.json({ error: "Choose employer or candidate." }, { status: 400 });
  }
  if (role === "employer" && !companyName) {
    return NextResponse.json({ error: "Company name is required for employers." }, { status: 400 });
  }

  await connectDB();
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await hash(password, 12);
  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
    companyName: role === "employer" ? companyName : undefined,
  });

  if (role === "employer") {
    await Employer.create({
      userId: new Types.ObjectId(String(user._id)),
      companyName,
    });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
