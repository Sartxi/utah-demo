const getEmailTemplate = (body: string) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Email Template</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
          body,
          html {
            background: #ffffff !important;
            font-family: "Montserrat", serif;
            font-optical-sizing: auto;
            font-style: normal;
          }

          body {
            max-width: 500px;
            margin: 20px auto;
            background: #f9f9f9;
            border: 1px solid silver;
            padding: 10px;
            border-radius: 5px;
          }

          .header {
            width: 100%;
            padding-bottom: 10px;
            border-bottom: 5px solid #c25f1d;
          }

          .logo {
            width: 200px;
            margin: 0 auto;
            display: block;
          }

          .body, .body-info {
            padding: 8px;
          }

          h1 {
            text-align: center;
            display: block;
            font-size: 1.4em;
            color: #333333;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #dddddd;
          }

          h3 {
            margin-bottom: 0;
          }

          .body-info h3 {
            margin: 0;
          }

          table,
          tbody,
          table tr {
            width: 100%;
          }

          table td {
            padding: 20px 0;
            border-top: 1px solid #dddddd;
            vertical-align: middle;
          }

          table tr label {
            display: inline-block;
            width: 150px;
            margin-right: 15px;
            font-size: 0.9em;
          }

          .capitalize {
            text-transform: capitalize;
          }
        </style>
      </head>

      <body>
        <div class="header">
          <img
            class="logo"
            src="https://raw.githubusercontent.com/Sartxi/utah-demo/refs/heads/main/public/logo.png"
            alt="Utah Demolition Logo"
          />
        </div>
        ${body}
      </body>
    </html>
  `;
}

export default getEmailTemplate;
