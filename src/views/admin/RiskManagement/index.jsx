// Chakra imports
import { Box } from "@chakra-ui/react";

// Custom components
import RiskDashboard from "views/admin/RiskManagement/components/RiskDashboard";
import RiskReports from "views/admin/RiskManagement/components/RiskReports";
import PredictiveAnalytics from "views/admin/RiskManagement/components/PredictiveAnalytics";

import React from "react";

export default function Overview() {
  return (
    <Box
    
    >
      <Box
      
      >
        <RiskDashboard />
        <RiskReports />
        < PredictiveAnalytics />
      </Box>
    </Box>
  );
}
