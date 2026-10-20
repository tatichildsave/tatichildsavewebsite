# Receiving Founding Families applications

The website's application buttons link to the public Google Form supplied by TATI:
https://forms.gle/eaxU3sHqMb6GBNb97

The `#register` page also embeds that same form, with a full-screen fallback link. Parents must select Google's **Submit** button at the end; merely opening the form does not submit an application. TATI receives submitted answers through the existing form, rather than through the former local draft page.

## For the form owner or an editor

1. Open the form in Google Forms editing mode and choose **Responses** to read applications.
2. In Responses, choose **Link to Sheets** (the green Sheets icon) to create or select a response spreadsheet. New submissions will appear there.
3. In Responses, open the three-dot menu and choose **Get email notifications for new responses** for the signed-in account.
4. Keep the form accepting responses while applications are open. Close it when the cohort is filled or recruitment ends.

The supplied link grants respondent access, not editor access. This website change does not configure your Google account's notification settings or inspect private responses. Email notifications are alerts about new responses; use the Responses tab or linked Sheet to read the full answers.

The current form's email question is optional. If an email reply is required for every application, make that question required in the form editor. The site does not alter the form's questions.

The offer states a cohort size of 50. It is static programme copy supplied by TATI, not a live remaining-seat counter. Google Forms has not been configured to stop automatically after 50 applications; applications and confirmed places may differ.

Official guidance:
- https://support.google.com/docs/answer/139706
- https://support.google.com/docs/answer/2839588

To change the respondent link in VS Code, edit `src/config/application.ts`.
