import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DocumentationPage = () => {
  const [documentationLibelle, setDocumentationLibelle] = useState("Google");

  return (
    <div className="w-full">
      <div className="flex items-center mt-5 w-[80%] mx-auto gap-4 justify-center  mb-5">
        <div
          onClick={() => setDocumentationLibelle("Google")}
          className="w-1/2 bg-white shadow-md cursor-pointer hover:opacity-70 duration-100 transition-all border p-2 flex items-center gap-4 justify-center  "
        >
          <img src="/images/google.png" className="w-10 h-10" />
          <div className="text-xl font-bold">Google</div>
        </div>
        <div
          onClick={() => setDocumentationLibelle("Microsoft")}
          className="w-1/2 bg-white shadow-md cursor-pointer hover:opacity-70 duration-100 transition-all border p-2 flex items-center gap-4 justify-center"
        >
          <img src="/images/microsoft.png" className="w-10 h-10 " />
          <div className="text-xl font-bold">Microsoft</div>
        </div>
      </div>
      {documentationLibelle === "Google" ? (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="text-2xl font-semibold mb-4 flex items-center gap-3">
            <img src="/images/gmail.png" className="w-10 h-10" />
            <div>Gmail SMTP Settings</div>
          </div>
          <div className="w-full">
            <video className="w-full" height="240" controls autoPlay>
              <source src="/videos/msendervideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mb-4">
            Configure your Gmail SMTP settings to send emails:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>SMTP Server Address:</strong> smtp.gmail.com
            </li>
            <li>
              <strong>Use Authentication:</strong> Yes
            </li>
            <li>
              <strong>Secure Connection:</strong> TLS/SSL based on your mail
              client/website SMTP plugin
            </li>
            <li>
              <strong>SMTP Username:</strong> Your Gmail account (e.g.,
              xxxx@gmail.com)
            </li>
            <li>
              <strong>SMTP Password:</strong> Your Gmail password
            </li>
            <li>
              <strong>Gmail SMTP Port:</strong> 465 (SSL) or 587 (TLS)
            </li>
          </ul>
          <h2 className="text-lg font-semibold mb-2">
            How to Configure Gmail SMTP Settings
          </h2>
          <p className="mb-4">
            There are three ways to set up Google's SMTP server:
          </p>
          <ol className="list-decimal pl-6 mb-6">
            <li>
              <strong>Google Workspace SMTP Relay Service:</strong> Use Google's
              SMTP relay service.
            </li>
            <li>
              <strong>Gmail's SMTP Server (Recommended):</strong> The most
              accessible method, no subscription required.
            </li>
            <li>
              <strong>Restricted Gmail SMTP Server:</strong> A more restrictive
              option.
            </li>
          </ol>
          <p className="mb-4">Why use the Gmail SMTP server method?</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Cost-effective</li>
            <li>No IP address restrictions</li>
            <li>Same security level as Google Workspace</li>
            <li>Allows forwarding emails through a Gmail alias</li>
          </ul>
          <p className="mb-4">
            <strong>What is a Gmail Alias?</strong>
          </p>
          <p className="mb-6">
            A Gmail alias lets you use a different email address for sending
            emails while still using your primary Gmail account. For example,{" "}
            <code>info@xyz.com</code> could be an alias for{" "}
            <code>mojave882@gmail.com</code>.
          </p>
          <p>
            If you have any further questions or need assistance, feel free to
            ask! 😊
          </p>

          <h2 className="text-xl font-bold mb-4">
            How to Set Up App Passwords
          </h2>
          <p className="mb-4">
            If you use 2-step verification on your Google account and your mail
            client doesn’t support verification codes, you’ll have to enable App
            Passwords before configuring the Google SMTP server settings.
          </p>
          <h3 className="text-lg font-semibold mb-2">
            Why should you do this?
          </h3>
          <p className="mb-4">
            Some secure apps can be blocked from accessing your mail account due
            to two-step verification. An app specific password allows the
            blocked app or device to access your mail account.
          </p>
          <p className="mb-4">
            If you don’t have two-factor authentication enabled, you can skip
            the instructions given below.
          </p>
          <h3 className="text-lg font-semibold mb-2">
            Here’s a quick tutorial on how to create an app specific password:
          </h3>
          <ol className="list-decimal ml-8 mb-4">
            <li>
              Go to your Google Account and choose Security on the left panel.
            </li>
          </ol>

          <div>
            <img
              src="/images/security.png"
              className="w-64 border h-96 shadow"
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            2. On the Signing in to Google tab, select App Passwords.
          </h3>
          <p className="mb-4">
            <img
              src="/images/app-passwords-768x253.png"
              alt="App Passwords"
              className="mb-2 border shadow"
            />
            If you don’t see this option, it might mean that:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>
              Two-step verification is not set up for your Google account.
            </li>
            <li>Two-step verification is set up for security keys only.</li>
            <li>
              Your account is used through work, school, or another
              organization.
            </li>
            <li>You’ve turned on Advanced Protection for your account.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">
            3. Click on Select app and pick the app you’re using.
          </h3>

          <h3 className="text-lg font-semibold mb-2">
            If you don’t see this option, it might mean that:
          </h3>
          <ul className="list-disc ml-8 mb-4">
            <li>
              Two-step verification is not set up for your Google account.
            </li>
            <li>Two-step verification is set up for security keys only.</li>
            <li>
              Your account is used through work, school, or another
              organization.
            </li>
            <li>You’ve turned on Advanced Protection for your account.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">
            3. Click on Select app and pick the app you’re using.
          </h3>
          <img
            src="/images/app-passwords-tab.png"
            alt="App Passwords Tab"
            className="mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">
            4. Click Select device and choose the device you’re using.
          </h3>
          <img
            src="/images/select-device.png"
            alt="Select Device"
            className="mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">5. Click on Generate.</h3>

          <h3 className="text-lg font-semibold mb-2">
            6. Follow the instructions to enter the App Password.
          </h3>
          <img
            src="/images/app-password-bar.png"
            alt="App Password Bar"
            className="mb-4"
          />
          <p className="mb-4">
            The App Password is the 16-character code in the yellow bar on your
            device.
          </p>
          <h3 className="text-lg font-semibold mb-2">7. Click on Done.</h3>
          <p className="mb-4">
            Note: You won’t have to remember your App Password since you’ll
            probably use it just once to connect your account to the app.
          </p>
          <h2 className="text-xl font-bold mb-4">
            b. How to Add Server Settings in Gmail
          </h2>
          <p className="mb-4">
            After connecting your Google account to the app, navigate to the
            outgoing email message server settings page on your email client,
            and enter the Gmail SMTP server settings below.
          </p>
          <p className="mb-4">
            Here are the account settings you need to configure SMTP in Gmail:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>
              <strong>SMTP Outgoing Mail Server:</strong> smtp.gmail.com
            </li>
            <li>
              <strong>Use Authentication:</strong> yes
            </li>
            <li>
              <strong>Secure Connection:</strong> TLS/SSL based on your mail
              client/website SMTP plugin
            </li>
            <li>
              <strong>Gmail SMTP Username:</strong> your full Gmail address
              (xxxx@gmail.com)
            </li>
            <li>
              <strong>Gmail SMTP Password:</strong> your Gmail password
            </li>
            <li>
              <strong>Gmail SMTP port:</strong> 465 (SMTP SSL) or 587 (SMTP TLS)
            </li>
          </ul>
          <p className="mb-4">
            Note: SMTP authentication highlights that the mail client has
            permission to relay emails through the Gmail server. In some cases,
            you’ll need to authenticate your domain name, which will help
            prevent your bulk emails from being labeled as suspicious emails.
          </p>
          <p className="mb-4">
            The process to configure the SMTP server setting depends on your
            email client.
          </p>
          <p className="mb-4">
            For example, if you use Microsoft Outlook, you can follow the steps
            I’ve covered here to configure the SMTP settings.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl h-screen   mx-auto p-6 bg-white rounded-lg shadow-md">
          <a
            href="https://support.microsoft.com/en-us/account-billing/create-app-passwords-from-the-security-info-preview-page-d8bc744a-ce3f-4d4d-89c9-eb38ab9d4137"
            target="_blank"
            className="mb-4 underline text-blue-600 hover:opacity-70 flex items-center gap-3 justify-center "
          >
            <FontAwesomeIcon
              icon={faBook}
              className="w-5 h-5 text-blue-600 mt-1"
            />{" "}
            see the documentation
          </a>
          <embed
            className="w-full h-full"
            src="https://support.microsoft.com/en-us/account-billing/create-app-passwords-from-the-security-info-preview-page-d8bc744a-ce3f-4d4d-89c9-eb38ab9d4137"
          />
        </div>
      )}
    </div>
  );
};

export default DocumentationPage;
