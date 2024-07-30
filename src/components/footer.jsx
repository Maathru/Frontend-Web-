import { userData } from "@/context/userAuth";
import { role } from "@/data/roleData";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { userDetails } = useContext(userData);

  return (
    <div className="mx-auto w-[100%] px-5 text-sm my-3 mt-auto mb-0 relative bottom-0 bg-white dark:bg-dark-background dark:text-white">
      <div className="flex justify-around md:justify-between py-5">
        <div>
          <p>&copy; {new Date().getFullYear()} Maathru Inc.</p>
        </div>
        <div className="hidden md:flex md:gap-3">
          {/* Common links */}
          <Link to="/">Home</Link>
          <p>|</p>
          <Link to="/blogs">Blog</Link>
          <p>|</p>
          <Link to="/forum">Forum</Link>

          {/* Admin links */}
          {userDetails.role === role.ADMIN && (
            <>
              <p>|</p>
              <Link to="/users">Users</Link>
            </>
          )}
          {/* Doctor links */}
          {userDetails.role === role.DOCTOR && (
            <>
              <p>|</p>
              <Link to="/clinics">Clinics</Link>
              <p>|</p>
              <Link to="/midwife">Midwife</Link>
              <p>|</p>
              <Link to="/drugs">Drugs</Link>
              <p>|</p>
              <Link to="/analytics">Analysis</Link>
            </>
          )}

          {/* Midwife links */}
          {userDetails.role === role.MIDWIFE && (
            <>
              <p>|</p>
              <Link to="/eligible">Eligibles</Link>
              <p>|</p>
              <Link to="/parents">Parents</Link>
            </>
          )}

          {/* Parent Links */}
          {userDetails.role === role.PARENT && (
            <>
              <p>|</p>
              <Link to="/growth">Growth</Link>
            </>
          )}

          {/* Parent and Eligible links */}
          {(userDetails.role === role.PARENT ||
            userDetails.role === role.ELIGIBLE) && (
            <>
              <p>|</p>
              <Link to="/eligible/1">Recovery Checklist</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
