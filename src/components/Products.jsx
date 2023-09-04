import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { fetchProducts } from "../utils/FetchData";
import Loader from "./UI/Loader";

const Products = () => {
  const [products, setProducts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const prodsData = await fetchProducts();
        setProducts(prodsData); // Updating our Product state with fetched products array
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <section className="text-gray-600 body-font p-10 mt-14 md:mt-10">
      {isLoading && (
        <div className="h-[100vh] mt-32">
          <Loader />
        </div>
      )}
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {!isLoading &&
            products?.map((product, index) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
                <Link
                  to={product._id}
                  className="block relative h-52 object-cover rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className=" object-contain object-center w-full h-full block"
                    src={product.image}
                  />
                </Link>

                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product?.category?.toUpperCase()}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">$ {product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default Products;
