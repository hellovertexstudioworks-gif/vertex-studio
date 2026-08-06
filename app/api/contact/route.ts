import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(
  process.env.RESEND_API_KEY
);



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



    console.log("SENDING EMAIL...");



    const { data, error } = await resend.emails.send({

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
      data,
      error,
    });



    if (error) {


      return NextResponse.json(

        {
          success:false,
          error:error.message,
        },

        {
          status:500,
        }

      );

    }



    return NextResponse.json({

      success:true,
      id:data?.id,

    });



  } catch(error) {


    console.error("CONTACT API ERROR:", error);



    return NextResponse.json(

      {
        success:false,
        error:"Something went wrong",
      },

      {
        status:500,
      }

    );


  }

}