export async function getRandomImage(): Promise<string> {
  try {
    const response = await fetch("https://pdimagearchive.org/infinite-view/", {
      headers: {
        Accept: "text/html",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch images")
    }

    // Parse the HTML to extract image URLs
    const html = await response.text()
    const imageUrls = html.match(/https:\/\/[^"']*\.(?:jpg|jpeg|gif|png)/gi) || []

    if (imageUrls.length === 0) {
      throw new Error("No images found")
    }

    // Return a random image URL
    return imageUrls[Math.floor(Math.random() * imageUrls.length)]
  } catch (error) {
    console.error("Error fetching random image:", error)
    // Return a fallback image URL
    return "/placeholder.svg"
  }
}
