const htmlTemplate = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }

        h2 {
          color: #333333;
          text-align: center;
        }

        p {
          color: #666666;
          line-height: 1.5;
        }

        .message {
          background-color: #f9f9f9;
          border: 1px solid #cccccc;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 10px;
          border: 1px solid #cccccc;
        }

        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        .date1 {
          color: #007bff;
        }
        .date2 {
          color: #ff6600;
        }

        @media (max-width: 480px) {
            .message {
              padding: 10px;
            }
  
            table {
              font-size: 14px;
            }
          }
      </style>
    </head>
    <body>
      <h2>Your feedback is more important than you think!</h2>
      <div class="message">
          <p>Hello <strong>{userName}</strong></p>
        <p>We value your feedback and input! It's time to fill out the appraisal form for the period: <span class="date1">{appraiselPeriodTo} -- {appraiselPeriodFrom}</span>.</p>
        <p>Your insights and thoughts are crucial in shaping our organization's growth and development.</p>
        <p>Please take a few minutes to provide your honest feedback and help us understand your achievements, challenges, and aspirations.</p>
        <p>Last date to fill <strong>Self Appraisel</strong> form: <span class="date2">{dateofSubmission}</span></p>
        <h4>Here are the details filled by your HR</h4>
        <table>
          <tr>
            <td>User Name</td>
            <td>{userName1}</td>
          </tr>
          <tr>
            <td>Employee ID</td>
            <td>{empId}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{dateOfBirth}</td>
          </tr>
          <tr>
            <td>Designation</td>
            <td>{designation}</td>
          </tr>
          <tr>
            <td>Present Pay</td>
            <td>{presentPay}</td>
          </tr>
          <tr>
            <td>Date of Entry in CDAC</td>
            <td>{dateOfEntryInCdac}</td>
          </tr>
          <tr>
            <td>Absence Other Than Leave</td>
            <td>{absenceOtherThanLeave}</td>
          </tr>
          <tr>
            <td>Leave Availed</td>
            <td>{leaveAvailed}</td>
          </tr>
        </table>

      </div>
    </body>
  </html>
`;

export default htmlTemplate;
