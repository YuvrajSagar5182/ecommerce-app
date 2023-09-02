import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-24 pb-10 mx-auto">
        <div className="text-center mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
            Explore Our Ecommerce World
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
            Discover a world of high-quality products and unbeatable deals.
            We're your go-to destination for all your shopping needs.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Quality Products
              </h2>
              <p className="leading-relaxed text-base">
                We curate a selection of the finest products, ensuring you get
                top-notch quality with every purchase.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Unbeatable Deals
              </h2>
              <p className="leading-relaxed text-base">
                Don't miss out on our exclusive deals and discounts. We're here
                to save you money on your favorite products.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Fast Shipping
              </h2>
              <p className="leading-relaxed text-base">
                We understand your need for speedy deliveries. Enjoy fast and
                reliable shipping options on all orders.
              </p>
            </div>
          </div>
        </div>
        <Link to={"/products"}>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Explore Now
          </button>
        </Link>
      </div>

      <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4 text-center py-6">
        Our Products
      </h2>
      <div className="flex flex-wrap px-6 mb-6">
        <div className="md:w-1/4 pr-4 pl-4 sm:w-1/2 mb-3 px-3">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 h-full">
            <Link to={"/products"}>
              <img
                className="w-full rounded rounded-t max-w-full h-auto"
                src="https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                height={160}
              />
            </Link>

            <div className="flex-auto p-6">
              <h5 className="mb-3 text-center">Mens's Clothing</h5>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 pr-4 pl-4 sm:w-1/2 mb-3 px-3">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 h-full">
            <Link to={"/products"}>
              <img
                className="w-full rounded rounded-t max-w-full h-auto"
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
            </Link>
            <div className="flex-auto p-6">
              <h5 className="mb-3 text-center">Women's Clothing</h5>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 pr-4 pl-4 sm:w-1/2 mb-3 px-3">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 h-full">
            <Link to={"/products"}>
              <img
                className="w-full rounded rounded-t max-w-full h-auto"
                src="https://media.istockphoto.com/id/1338646661/photo/gold-jewelry-diamond-rings-show-in-luxury-retail-store-window-display-showcase.jpg?b=1&s=612x612&w=0&k=20&c=4awexxTFq9bTMvU8RXnP9BNnKMbGNlTcc9qjMJezAMc="
                alt=""
                height={160}
              />
            </Link>

            <div className="flex-auto p-6">
              <h5 className="mb-3 text-center">Jewelery</h5>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 pr-4 pl-4 sm:w-1/2 mb-3 px-3">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 h-full">
            <Link to={"/products"}>
              <img
                className="w-full rounded rounded-t max-w-full h-auto"
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
            </Link>

            <div className="flex-auto p-6">
              <h5 className="mb-3 text-center">Electronics Accessories</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <section className="text-gray-600 body-font">
    //   <div className="container px-5 py-24 mx-auto">
    //     <div className="text-center mb-20">
    //       <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
    //         Raw Denim Heirloom Man Braid
    //       </h1>
    //       <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
    //         Blue bottle crucifix vinyl post-ironic four dollar toast vegan
    //         taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
    //         pug.
    //       </p>
    //       <div className="flex mt-6 justify-center">
    //         <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
    //       </div>
    //     </div>
    //     <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
    //       <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
    //         <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
    //           <svg
    //             fill="none"
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="w-10 h-10"
    //             viewBox="0 0 24 24">
    //             <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    //           </svg>
    //         </div>
    //         <div className="flex-grow">
    //           <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
    //             Shooting Stars
    //           </h2>
    //           <p className="leading-relaxed text-base">
    //             Blue bottle crucifix vinyl post-ironic four dollar toast vegan
    //             taxidermy. Gastropub indxgo juice poutine, ramps microdosing
    //             banh mi pug VHS try-hard.
    //           </p>
    //           <Link className="mt-3 text-indigo-500 inline-flex items-center">
    //             Learn More
    //             <svg
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="w-4 h-4 ml-2"
    //               viewBox="0 0 24 24">
    //               <path d="M5 12h14M12 5l7 7-7 7"></path>
    //             </svg>
    //           </Link>
    //         </div>
    //       </div>
    //       <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
    //         <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
    //           <svg
    //             fill="none"
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="w-10 h-10"
    //             viewBox="0 0 24 24">
    //             <circle cx="6" cy="6" r="3"></circle>
    //             <circle cx="6" cy="18" r="3"></circle>
    //             <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
    //           </svg>
    //         </div>
    //         <div className="flex-grow">
    //           <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
    //             The Catalyzer
    //           </h2>
    //           <p className="leading-relaxed text-base">
    //             Blue bottle crucifix vinyl post-ironic four dollar toast vegan
    //             taxidermy. Gastropub indxgo juice poutine, ramps microdosing
    //             banh mi pug VHS try-hard.
    //           </p>
    //           <Link className="mt-3 text-indigo-500 inline-flex items-center">
    //             Learn More
    //             <svg
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="w-4 h-4 ml-2"
    //               viewBox="0 0 24 24">
    //               <path d="M5 12h14M12 5l7 7-7 7"></path>
    //             </svg>
    //           </Link>
    //         </div>
    //       </div>
    //       <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
    //         <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
    //           <svg
    //             fill="none"
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="w-10 h-10"
    //             viewBox="0 0 24 24">
    //             <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
    //             <circle cx="12" cy="7" r="4"></circle>
    //           </svg>
    //         </div>
    //         <div className="flex-grow">
    //           <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
    //             Neptune
    //           </h2>
    //           <p className="leading-relaxed text-base">
    //             Blue bottle crucifix vinyl post-ironic four dollar toast vegan
    //             taxidermy. Gastropub indxgo juice poutine, ramps microdosing
    //             banh mi pug VHS try-hard.
    //           </p>
    //           <Link className="mt-3 text-indigo-500 inline-flex items-center">
    //             Learn More
    //             <svg
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="w-4 h-4 ml-2"
    //               viewBox="0 0 24 24">
    //               <path d="M5 12h14M12 5l7 7-7 7"></path>
    //             </svg>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //     <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
    //       Button
    //     </button>
    //   </div>
    // </section>
  );
};

export default AboutPage;
