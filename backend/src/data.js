const data = {
  users: [
    {
      name: "Rimon hossain",
      email: "rimonhossen333@gmail.com",
      password: "Rimon1234$",
      phone: "01738743833",
      address: "boyragirchar, daulotpur, kushtia",
      isAdmin: true,
    },
    {
      name: "likhon islam",
      email: "likhonislam@gamil.com",
      password: "Likhon1234$",
      phone: "01723232334",
      address: "taragunia, daulotpur, kushtia",
    },
  ],

  products: [
    {
      name:"iphone 12",
      slug:"iphone-12",
      description: "The iPhone 12 is a compact yet powerful smartphone developed by Apple. It features a sleek design with flat edges reminiscent of the iPhone 5 and iPhone SE. The device boasts a 6.1-inch Super Retina XDR display, offering vibrant colors and deep blacks.",
      price:1200,
      image: "public/images/products/default.png",
      sold:20,
      quantity:40,
      shipping:0,
      category: "65d433a094f294214cba6692"
    },
    {
      name:"iphone 13",
      slug:"iphone-13",
      description: "The iPhone 13, released in September 2021, features a sleek design, improved Super Retina XDR displays, and Apple's powerful A15 Bionic chip. It comes in four sizes and offers better battery life, enhanced camera capabilities, and 5G connectivity.",
      price:1300,
      image: "public/images/products/default.png",
      sold:25,
      quantity:50,
      shipping:0,
      category: "65d433a094f294214cba6692"
    },
    {
      name:"samsung a34",
      slug:"samsung-a34",
      description: "Galaxy A34 5G is rated as IP67. Based on lab test conditions for submersion in up to 1 metre of freshwater for up to 30 minutes. Not advised for beach or pool use. Water and dust resistance of device is not permanent and may diminish over time.**Colour availability may vary depending on country, region, or carrier. ***5G network availability and actual speed may vary depending on country, network provider and user environment.",
      price:1000,
      image: "public/images/products/default.png",
      sold:30,
      quantity:40,
      shipping:0,
      category: "65d433b094f294214cba6695"
    },
    {
      name:"Calaxy z flip4",
      slug:"galaxy-z-flip4",
      description: "The Galaxy Z Flip4 is a cutting-edge foldable smartphone by Samsung, boasting a sleek clamshell design. With its foldable 6.7-inch AMOLED display, it offers a compact form factor when closed. Powered by advanced hardware, likely featuring the latest Snapdragon processor, it ensures smooth performance. Equipped with high-quality cameras and supporting wireless charging, the Galaxy Z Flip4 combines innovation with practicality, redefining the smartphone experience.",
      price:9999,
      image: "public/images/products/default.png",
      sold:15,
      quantity:40,
      shipping:0,
      category: "65d433b094f294214cba6695"
    },
  ]
};

module.exports = data;
