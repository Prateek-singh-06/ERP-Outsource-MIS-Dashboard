let viewCount = 3;
let lastResetDate = new Date().getDate(); // Store the current day of the month

function checkAndResetCounter() {
  const now = new Date();
  const currentDate = now.getDate();
  
  // If the day has changed and it's past midnight, reset the counter
  if (currentDate !== lastResetDate && now.getHours() >= 0) {
    viewCount = 3;
    lastResetDate = currentDate;
  }
}

export async function GET() {
  checkAndResetCounter();
  return Response.json({ views: viewCount });
}

export async function POST() {
  checkAndResetCounter();
  viewCount++;
  return Response.json({ views: viewCount });
}