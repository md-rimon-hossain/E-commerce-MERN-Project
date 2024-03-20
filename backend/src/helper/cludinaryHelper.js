
const publicIdWithoutExtension = async (imageUrl)=> {
  try {
    const pathSegments = imageUrl.split("/")
  // get the last segment 
  const lastSegment = pathSegments[pathSegments.length - 1]

  const fileExtensions = ['.jpg', '.png', '.jpeg', ".webp"];
  const replaceExtension = fileExtensions.filter((extension)=> {
    const isExtensionMatch = lastSegment.includes(extension)
    if(isExtensionMatch){
      return extension
    }
  })
  const valueWithoutExtension = lastSegment.replace(replaceExtension," ")
  console.log(valueWithoutExtension)

  return valueWithoutExtension
  } catch (error) {
    throw error
  }
} 

module.exports = {
  publicIdWithoutExtension
}