## Getting Started

To run the project, use the following scripts:

- `npm run dev` - Run the project in development mode.
- `npm run build` - Build the project.
- `npm run start` - Start the built project.

## Additional Information

While working on the task, I partially relied on the questionnaire: [https://appnebula.co/app-subscription-4-7d-trial-per-day](https://appnebula.co/app-subscription-4-7d-trial-per-day).

During analysis, I noticed an issue with the screen rendering on pages that require dynamic data, for example, [https://appnebula.co/app-subscription-4-7d-trial-per-day/singleZodiacInfo](https://appnebula.co/app-subscription-4-7d-trial-per-day/singleZodiacInfo). In this case, the user can directly navigate to these pages (by copying the link) without completing the necessary previous steps for the data to display.

- To resolve this issue, I used middleware to restrict access to these pages or redirect the user to the start (or the last completed step) of the questionnaire. This ensures that users cannot skip required questions and prevents them from accessing steps that require prior data.
