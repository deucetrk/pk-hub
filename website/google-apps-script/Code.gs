const SPREADSHEET_ID = '1VC2y7Fom8q4PHG-AZL637q_VoAxiVuo2fy8c2oW-OCc';
const SHEET_NAME = 'Leads';

function doGet() {
  return response_({ ok: true, service: 'pkhub-leads' });
}

function doPost(event) {
  try {
    const lead = event && event.parameter ? event.parameter : {};

    if (lead.website) {
      return response_({ ok: true });
    }

    validateLead_(lead);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error('Leads sheet not found');

      if (isDuplicate_(sheet, lead.requestId)) {
        return response_({ ok: true, duplicate: true });
      }

      const phone = clean_(lead.phone);
      sheet.appendRow([
        Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss'),
        clean_(lead.shopName),
        clean_(lead.province),
        clean_(lead.contactName),
        phone,
        clean_(lead.lineId),
        clean_(lead.email),
        clean_(lead.interestedBrands),
        clean_(lead.note),
        lead.consent === 'true' ? 'Yes' : 'No',
        clean_(lead.language),
        clean_(lead.sourcePage),
        'New',
        clean_(lead.requestId),
      ]);

      const appendedRow = sheet.getLastRow();
      sheet.getRange(appendedRow, 5).setNumberFormat('@').setValue(phone);
    } finally {
      lock.releaseLock();
    }

    return response_({ ok: true });
  } catch (error) {
    console.error(error);
    return response_({ ok: false, error: String(error) });
  }
}

function validateLead_(lead) {
  const required = ['shopName', 'province', 'contactName', 'phone', 'interestedBrands', 'requestId'];

  required.forEach(function (key) {
    if (!clean_(lead[key])) throw new Error('Missing required field: ' + key);
  });

  if (lead.consent !== 'true') throw new Error('Consent is required');
  if (!/^0[\d\s-]{8,12}$/.test(clean_(lead.phone))) throw new Error('Invalid phone number');
}

function isDuplicate_(sheet, requestId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  return sheet
    .getRange(2, 14, lastRow - 1, 1)
    .getDisplayValues()
    .some(function (row) {
      return row[0] === requestId;
    });
}

function clean_(value) {
  const text = String(value || '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function response_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
