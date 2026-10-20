import { ChildRegistration } from '../types';

const SHEET_TITLE = 'TATI ChildSave Community Registrations';

interface SpreadsheetInfo {
  id: string;
  url: string;
  title: string;
}

/**
 * Searches for an existing TATI ChildSave registrations spreadsheet or creates a new one
 */
export async function getOrCreateRegistrationSpreadsheet(accessToken: string): Promise<SpreadsheetInfo> {
  // 1. Search Google Drive for an existing spreadsheet with this name
  try {
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      `name = '${SHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
    )}&fields=files(id,name,webViewLink)`;

    const driveRes = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (driveRes.ok) {
      const driveData = await driveRes.json();
      if (driveData.files && driveData.files.length > 0) {
        const file = driveData.files[0];
        return {
          id: file.id,
          url: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
          title: file.name,
        };
      }
    }
  } catch (err) {
    console.warn('Drive search fallback to direct create', err);
  }

  // 2. Create a fresh new Google Sheet with headers styled
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: 'Registrations',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Timestamp' } },
                    { userEnteredValue: { stringValue: 'Child Name' } },
                    { userEnteredValue: { stringValue: 'Age' } },
                    { userEnteredValue: { stringValue: 'Gender' } },
                    { userEnteredValue: { stringValue: 'City' } },
                    { userEnteredValue: { stringValue: 'Country' } },
                    { userEnteredValue: { stringValue: 'Parent / Guardian' } },
                    { userEnteredValue: { stringValue: 'Parent Email' } },
                    { userEnteredValue: { stringValue: 'Phone / WhatsApp' } },
                    { userEnteredValue: { stringValue: 'Pathway' } },
                    { userEnteredValue: { stringValue: 'Kit Delivery Address' } },
                    { userEnteredValue: { stringValue: 'Savings Goal' } },
                    { userEnteredValue: { stringValue: 'Community Status' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to create Google Sheet');
  }

  const sheetData = await createRes.json();
  return {
    id: sheetData.spreadsheetId,
    url: sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${sheetData.spreadsheetId}/edit`,
    title: sheetData.properties?.title || SHEET_TITLE,
  };
}

/**
 * Appends a child registration row into the spreadsheet
 */
export async function appendRegistrationToSheet(
  accessToken: string,
  spreadsheetId: string,
  reg: ChildRegistration
): Promise<boolean> {
  const rowData = [
    new Date(reg.registeredAt || Date.now()).toLocaleString('en-GB'),
    reg.childName,
    reg.childAge.toString(),
    reg.childGender,
    reg.city,
    reg.country,
    reg.parentName,
    reg.parentEmail,
    reg.parentPhone,
    reg.pathway.toUpperCase(),
    reg.kitDeliveryAddress,
    reg.savingsGoal,
    'Enrolled & Active • Kit Prepared',
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Registrations!A:M:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowData],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to append registration row to Google Sheet');
  }

  return true;
}

/**
 * Reads all registration records from the spreadsheet
 */
export async function fetchRegistrationsFromSheet(
  accessToken: string,
  spreadsheetId: string
): Promise<string[][]> {
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Registrations!A1:M100`;

  const res = await fetch(readUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.values || [];
}
