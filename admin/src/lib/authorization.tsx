import { useProfileQuery } from "@/services/profile/profile-query";
import React, { ReactNode } from "react";

export const useAuthorization = () => {
  const { data: user } = useProfileQuery();

  const role = user?.role;

  const checkAccess = React.useCallback(
    (allowedRoles: string[]) => {
      if (allowedRoles && allowedRoles.length > 0 && role) {
        return allowedRoles.includes(role);
      }

      return false;
    },
    [role]
  );

  return { checkAccess, role };
};

interface AuthorizationProps {
  allowedRoles: string[];
  children: ReactNode | ReactNode[];
}

export const Authorization = ({
  allowedRoles,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess(allowedRoles);
  }

  return <>{canAccess ? children : undefined}</>;
};
