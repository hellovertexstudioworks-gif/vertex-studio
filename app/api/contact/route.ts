import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log("CONTACT API STARTED");

    const body = await request.json();

    const {
      name,
      email,
      business,
      websiteType,
      message,
    } = body;

    console.log("FORM DATA:", {
      name,
      email,
      business,
      websiteType,
      message,
    });

    /*
     * Supabase
     */
    const supabase = await createClient();

    /*
     * SAVE LEAD
     */
    console.log("SAVING LEAD TO SUPABASE...");

    const { error: leadError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        business,
        website_type: websiteType,
        message,
        status: "New",
        source: "Website",
      });

    console.log("SUPABASE LEAD RESPONSE:", {
      error: leadError,
    });

    if (leadError) {
      console.error("SUPABASE LEAD ERROR:", leadError);

      return NextResponse.json(
        {
          success: false,
          error: leadError.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
     * SAVE MESSAGE
     */
    console.log("SAVING MESSAGE TO SUPABASE...");

    const { error: messageError } = await supabase
      .from("messages")
      .insert({
        name,
        email,
        business,
        subject: "New Website Inquiry",
        message,
        status: "New",
      });

    console.log("SUPABASE MESSAGE RESPONSE:", {
      error: messageError,
    });

    if (messageError) {
      console.error("SUPABASE MESSAGE ERROR:", messageError);

      return NextResponse.json(
        {
          success: false,
          error: messageError.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
     * SEND EMAIL
     */
    console.log("SENDING EMAIL...");

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: "onboarding@resend.dev",

        to: "hello.vertexstudioworks@gmail.com",

        subject: `🚀 New Project Inquiry - ${name}`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              background:#050816;
              padding:40px;
              color:white;
            "
          >
            <div
              style="
                max-width:600px;
                margin:auto;
                background:#111827;
                padding:30px;
                border-radius:20px;
              "
            >

              <h1 style="color:#38bdf8;">
                Vertex Studio Works
              </h1>

              <h2>
                🚀 New Website Project Inquiry
              </h2>

              <p>
                You received a new message from your website.
              </p>

              <hr />

              <h3>
                Client Information
              </h3>

              <p>
                <strong>Name:</strong> ${name}
              </p>

              <p>
                <strong>Email:</strong> ${email}
              </p>

              <p>
                <strong>Business:</strong> ${business}
              </p>

              <p>
                <strong>Website Type:</strong> ${websiteType}
              </p>

              <hr />

              <h3>
                Project Details
              </h3>

              <p>
                ${message}
              </p>

              <br />

              <p
                style="
                  color:#94a3b8;
                  font-size:14px;
                "
              >
                Vertex Studio Works<br/>
                Premium Website Design & Development
              </p>

            </div>
          </div>
        `,
      });

    console.log("RESEND RESPONSE:", {
      data: emailData,
      error: emailError,
    });

    if (emailError) {
      return NextResponse.json(
        {
          success: false,
          error: emailError.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
     * SUCCESS
     */
    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully.",
      emailId: emailData?.id,
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}