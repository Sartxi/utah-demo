import { PageDetails } from "../../../lib/db";
import { Nav, Pages } from "../../../lib/schema";

interface SaSession {
  user: {
    name: string;
    email: string;
  };
}

export interface SaEditorProps {
  session?: SaSession;
  nav?: Nav[];
  page?: PageDetails;
  pages?: Pages[];
}

export interface SaEditProps extends SaEditorProps {
  open: boolean;
}
