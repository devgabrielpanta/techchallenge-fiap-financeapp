import SidebarMobile from "@/components/sidebar/SidebarMobile";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import { useUser } from "@/context/UserContext";

export const Sidebar: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useUser();
  return (
    <>
      <SidebarMobile isMenuOpen={isMenuOpen} />
      <SidebarDesktop />
    </>
  );
};
