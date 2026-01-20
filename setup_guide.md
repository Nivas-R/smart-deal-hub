
# Smart Deal Hub - Setup Guide

This guide will help you set up your 100% free affiliate marketing website using Google Sheets as a database and GitHub Pages for hosting.

## 1. Database Setup (Google Sheets)

1. Create a new Google Sheet.
2. Name the first tab (sheet) as `Products`.
3. In the first row (A1 to I1), add these headers exactly as written:
   `ID`, `Timestamp`, `Name`, `ImageURL`, `AffiliateLink`, `Platform`, `Categories`, `Description`, `Trending`
4. Go to **Extensions > Apps Script**.

## 2. Backend API Setup (Google Apps Script)

Replace the code in the Apps Script editor with the following:

```javascript
const SHEET_NAME = 'Products';

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  
  const products = data.map((row, index) => {
    return {
      id: row[0],
      timestamp: row[1],
      name: row[2],
      imageUrl: row[3],
      affiliateLink: row[4],
      platform: row[5],
      categories: row[6].split(','),
      description: row[7],
      isTrending: row[8] === true || row[8] === "TRUE"
    };
  });
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: products }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    sheet.appendRow([
      Utilities.getUuid(),
      new Date(),
      params.name,
      params.imageUrl,
      params.affiliateLink,
      params.platform,
      params.categories.join(','),
      params.description,
      params.isTrending
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Deployment
1. Click **Deploy > New Deployment**.
2. Select **Web App**.
3. Set "Execute as" to **Me**.
4. Set "Who has access" to **Anyone**.
5. Click **Deploy**.
6. **IMPORTANT:** Copy the "Web App URL" and paste it into `constants.ts` replacing `YOUR_SCRIPT_ID`.

## 3. Frontend Hosting (GitHub Pages)

1. Upload all files from this project to a new GitHub repository.
2. Go to repository **Settings > Pages**.
3. Select "Deploy from a branch" and pick the `main` branch.
4. Your site will be live at `https://username.github.io/repo-name/`.

## 4. How to Use

- **Public Site:** Users visit the homepage and platform pages.
- **Admin Panel:** Visit your site URL with `#/admin` (e.g., `yoursite.com/#/admin`). This link is not visible in the navigation for security.
- **Adding Products:** Fill out the form in the Admin panel. Use an image URL (you can upload images to free sites like Imgur, PostImages, or directly use the URL from the retailer's site).
- **Managing:** You can edit or delete items directly in the Google Sheet.

## 5. Adding New Platforms
To add a platform like "Etsy":
1. Open `types.ts` and add `'Etsy'` to the `Platform` type.
2. Open `constants.ts` and add `'Etsy'` to the `PLATFORMS` array.
The UI will automatically update the navigation and filters!
