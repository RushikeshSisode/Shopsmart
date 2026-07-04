import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white py-3 text-sm font-medium transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer */}
      <div className="bg-[#232F3E] text-white py-10">
        <div className="amazon-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-base mb-3">Get to Know Us</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">About Us</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Careers</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Press Releases</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Amazon Science</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-3">Connect with Us</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Facebook</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Twitter</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Instagram</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-3">Make Money with Us</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Sell on Mart</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Become an Affiliate</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Advertise Your Products</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-3">Let Us Help You</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Your Account</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Returns Centre</Link></li>
                <li><Link to="#" className="text-sm text-gray-300 hover:underline">Help</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#131A22] text-gray-400 py-6">
        <div className="amazon-container text-center">
          <div className="flex justify-center items-center space-x-4 mb-3">
            <span className="text-xl font-bold">
              <span className="text-[#FF9900]">M</span>art
            </span>
            <span className="text-xs">.com</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <Link to="#" className="hover:underline">Conditions of Use</Link>
            <Link to="#" className="hover:underline">Privacy Notice</Link>
            <Link to="#" className="hover:underline">Your Ads Privacy Choices</Link>
            <span>© 2024, Mart.com, Inc. or its affiliates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;