import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Test if we can navigate to doctor profiles
    console.log("Testing navigation to doctor profiles...");
    
    // Test each doctor profile route
    const testRoutes = [
      "/doctors/dr-sarah-johnson",
      "/doctors/dr-emily-rodriguez", 
      "/doctors/dr-david-kim",
      "/doctors/dr-jennifer-lee"
    ];

    testRoutes.forEach(route => {
      console.log(`Testing route: ${route}`);
      // Try to navigate to see if it works
      try {
        navigate(route, { replace: true });
        console.log(`✓ Successfully navigated to: ${route}`);
      } catch (error) {
        console.error(`✗ Failed to navigate to: ${route}`, error);
      }
    });
  }, [navigate]);

  return (
    <div className="p-4">
      <h2>Navigation Test</h2>
      <p>Check browser console for navigation test results.</p>
    </div>
  );
};

export default TestNavigation;
