import { UserRole } from "@/types/User";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  console.log("reqjfdjfjladfjkldfjklfjkldjklfajklfdjklfdjklfjkldfkjldjklf",req)
  const { email, password } = await req.json();

  
  // Dummy user for testing
  const dummyUser = {
    id: 1,
    firstName: "Jad",
    lastName: "Doe",
    email: "jad@gmail.com",
    isActive: true,
    role: UserRole.ADMIN,
    mobile: "1234567890",
    password: "12",
  };

  // Check credentials
  if (email === dummyUser.email && password === dummyUser.password) {
    return NextResponse.json({
      user: {
        id: dummyUser.id,
        firstName: dummyUser.firstName,
        lastName: dummyUser.lastName,
        email: dummyUser.email,
        isActive: dummyUser.isActive,
        role: dummyUser.role,
        mobile: dummyUser.mobile,
      },
      accessToken: "dummy-access-token-123",
      refreshToken: "dummy-refresh-token-456",
    });
    
  }
   else {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
