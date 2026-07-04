import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStore,
  FaTruck,
  FaLock,
  FaUndo,
  FaCheck,
  FaChevronLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  // Render stars for rating display
  const renderStars = (rating, numReviews) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-[#FFA41C] text-lg" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-[#FFA41C] text-lg" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-gray-300 text-lg" />
        ))}
        <span className="text-sm text-[#007185] ml-2 hover:underline cursor-pointer">
          {numReviews || 0} ratings
        </span>
      </div>
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  if (isLoading) {
    return (
      <div className="amazon-bg-light min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="amazon-bg-light min-h-screen flex items-center justify-center">
        <Message variant="danger">
          {error?.data?.message || error?.message || "Product not found"}
        </Message>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="amazon-bg-light min-h-screen flex items-center justify-center">
        <Message variant="danger">Product not found</Message>
      </div>
    );
  }

  return (
    <div className="amazon-bg-light min-h-screen py-4">
      <div className="amazon-container">
        {/* Breadcrumb */}
        <div className="text-sm text-[#007185] mb-4 flex items-center flex-wrap gap-1">
          <Link to="/" className="hover:text-[#C7511F] hover:underline">
            Home
          </Link>
          <span className="text-gray-500">›</span>
          <Link to="/shop" className="hover:text-[#C7511F] hover:underline">
            Shop
          </Link>
          <span className="text-gray-500">›</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-contain"
                />
                {/* Prime Badge */}
                <span className="absolute top-2 left-2 bg-[#FF9900] text-white text-xs font-bold px-2 py-0.5 rounded">
                  Prime
                </span>
                <HeartIcon product={product} />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              {/* Product Name */}
              <h1 className="text-2xl font-medium text-gray-800">{product.name}</h1>

              {/* Brand & Rating */}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Link to={`/shop?brand=${product.brand}`} className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                  Brand: {product.brand}
                </Link>
                <span className="text-gray-300">|</span>
                {renderStars(product.rating || 0, product.numReviews || 0)}
              </div>

              {/* Price */}
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#B12704]">
                    ${product.price?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-sm text-[#067D62] font-medium ml-2">
                    -20%
                  </span>
                </div>
              </div>

              {/* Tax & Shipping Info */}
              <div className="mt-2 text-sm text-gray-600">
                <span className="text-[#067D62] font-medium">FREE delivery</span>
                <span className="mx-1">·</span>
                <span>No Import Fees & Free Shipping Included</span>
              </div>

              {/* Stock Status */}
              <div className="mt-3">
                {product.countInStock > 0 ? (
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-[#067D62]" />
                    <span className="text-[#067D62] font-medium">In Stock</span>
                    <span className="text-sm text-gray-500">
                      ({product.countInStock} available)
                    </span>
                  </div>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-bold text-gray-700 mb-2">About this item</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Details Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaStore className="text-gray-400" />
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBox className="text-gray-400" />
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category?.name || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span className="text-gray-600">Added:</span>
                  <span className="font-medium">{moment(product.createdAt).fromNow()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShoppingCart className="text-gray-400" />
                  <span className="text-gray-600">Sold by:</span>
                  <span className="font-medium">Mart</span>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <FaTruck className="text-[#067D62] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#067D62]">FREE delivery</p>
                    <p className="text-xs text-gray-600">
                      Get it by {moment().add(2, 'days').format('dddd, MMMM D')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <FaLock className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Secure transaction</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <FaUndo className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Free returns within 30 days</p>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {product.countInStock > 0 && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Qty:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="amazon-select py-1 text-sm"
                    >
                      {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`flex-1 sm:flex-none py-3 px-8 rounded text-sm font-bold transition-colors ${
                    product.countInStock > 0
                      ? "amazon-btn-primary"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart className="inline mr-2" />
                  {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>

                <button className="py-3 px-6 rounded text-sm font-bold amazon-btn-secondary">
                  Buy Now
                </button>
              </div>

              {/* Secure Checkout */}
              <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                <FaLock className="text-xs" />
                <span>Secure and trusted checkout with</span>
                <span className="font-bold text-gray-700">Mart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs - Reviews & Related Products */}
        <div className="mt-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            to="/shop"
            className="inline-flex items-center text-[#007185] hover:text-[#C7511F] hover:underline text-sm"
          >
            <FaChevronLeft className="mr-1 text-xs" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;