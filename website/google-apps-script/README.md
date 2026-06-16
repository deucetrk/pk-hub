# PK HUB lead endpoint

This Apps Script receives the website partner form and appends leads to the
`Leads` tab in the `PK Hub Leads` spreadsheet.

## Deploy

1. Open the spreadsheet and choose **Extensions > Apps Script**.
2. Replace the editor contents with `Code.gs`.
3. Choose **Deploy > New deployment > Web app**.
4. Set **Execute as** to yourself and **Who has access** to anyone.
5. Copy the `/exec` URL into `VITE_PARTNER_LEAD_ENDPOINT` in the website's
   production environment.
6. Rebuild and deploy the website.

After deployment, opening the `/exec` URL should return:

```json
{"ok":true,"service":"pkhub-leads"}
```
