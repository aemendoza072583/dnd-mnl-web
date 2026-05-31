import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
} from "@/assets/images/icons";
import { useSidebar } from "@/app/providers/SidebarProvider";

import logo_64 from "@/assets/images/logo/logo_64.png";
import logo_64_64 from "@/assets/images/logo/logo_64_64.png";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  target?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    target?: string;
  }[];
};

const productsIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25V15.75L12 21L3 15.75V8.25L12 3L21 8.25Z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12M21 8.25L12 12L3 8.25"/>
  </svg>;

const inventoryIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6H20V18H4V6Z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10H16M8 14H13"/>
  </svg>;

const orderAllocationIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12L11 15L16 9"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6H20V18H4V6Z"/>
  </svg>;

const logisticsIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8H15V17H3V8Z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11H19L21 13V17H15"/>
    <circle cx="7" cy="18" r="1.5"/>
    <circle cx="18" cy="18" r="1.5"/>
  </svg>;

const returnsExchangeIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7H17V17H7V7Z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 10L14 14M14 10L10 14"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H2M22 12H19"/>
  </svg>;

const reportsIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 19V10M12 19V5M19 19V13"/>
  </svg>;

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/inventory",
  },
  {
    name: "Products",
    icon: productsIcon,
    subItems: [
      { name: "Products", path: "/inventory/products" },
      { name: "Categories", path: "/inventory/categories" },
      { name: "Brands", path: "/inventory/brands" },
      { name: "Product Attributes", path: "/inventory/product-attributes" },
    ],
  },
  {
    name: "Inventory Management",
    icon: inventoryIcon,
    subItems: [
      { name: "Inventory List", path: "/inventory/inventory-list" },
      { name: "Add Inventory", path: "/inventory/add-inventory" },
      { name: "Stock Adjustment", path: "/inventory/stock-adjustment" },
      { name: "Inventory Transfer", path: "/inventory/inventory-transfer" },
      { name: "Inventory History", path: "/inventory/inventory-history" },
    ],
  },
  {
    name: "Order Allocation",
    icon: orderAllocationIcon,
    subItems: [
      { name: "Pending Assignment", path: "/inventory/pending-assignment" },
      { name: "Assigned Inventory", path: "/inventory/assigned-inventory" },
      { name: "Auto Allocation Logs", path: "/inventory/auto-allocation-logs" },
    ],
  },
  {
    name: "Logistics",
    icon: logisticsIcon,
    subItems: [
      { name: "For Shipping", path: "/inventory/for-shipping" },
      { name: "Shipping Booked", path: "/inventory/shipping-booked" },
      { name: "Packed Orders", path: "/inventory/packed-orders" },
      { name: "Logistics Status Update", path: "/inventory/logistics-status-update" },
      { name: "Serial Verification", path: "/inventory/serial-verification" },
    ],
  },
  {
    name: "Returns & Exchange",
    icon: returnsExchangeIcon,
    subItems: [
      { name: "Returned to Sender (RTS)", path: "/inventory/returned-to-sender" },
      { name: "Product Exchange", path: "/inventory/product-exchange" },
      { name: "Refund Processing", path: "/inventory/refund-processing" },
      { name: "Returned Inventory List", path: "/inventory/returned-inventory-list" },
    ],
  },
  {
    name: "Reports",
    icon: reportsIcon,
    subItems: [
      { name: "Inventory Valuation", path: "/inventory/inventory-valuation" },
      { name: "Stock Movement", path: "/inventory/stock-movement" },
      { name: "Inventory Aging", path: "/inventory/inventory-aging" },
      { name: "Returned Items", path: "/inventory/returned-items" },
      { name: "Sold Items", path: "/inventory/sold-items" },
      { name: "Exchange History", path: "/inventory/exchange-history" },
      { name: "Adjustment History", path: "/inventory/adjustment-history" },
    ],
  },
];

const othersItems: NavItem[] = [];

const supportItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen } =
    useSidebar();
  const location = useLocation();
  // Auto-close sidebar on mobile after route change
  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "support", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "support"
            ? supportItems
            : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "support" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others",
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "support" | "others",
  ) => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "xl:justify-center"
                  : "xl:justify-start"
                }`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {nav.new && (isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`ml-auto absolute right-10 ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "menu-dropdown-badge-active"
                      : "menu-dropdown-badge-inactive"
                    } menu-dropdown-badge`}
                >
                  new
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                target={nav.target}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      target={subItem.target}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-pro-active"
                                : "menu-dropdown-badge-pro-inactive"
                              } menu-dropdown-badge-pro`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed  flex flex-col  top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8  flex ${!isExpanded && !isHovered ? "xl:justify-center" : "justify-start"
          }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src={logo_64}
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src={logo_64}
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src={logo_64_64}
              alt="Logo"
              width={64}
              height={64}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "xl:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            {supportItems.length > 0 && (
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                      ? "xl:justify-center"
                      : "justify-start"
                    }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Support"
                  ) : (
                    <HorizontaLDots className="size-6" />
                  )}
                </h2>
                {renderMenuItems(supportItems, "support")}
              </div>
            )}
            {othersItems.length > 0 && (
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                      ? "xl:justify-center"
                      : "justify-start"
                    }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Others"
                  ) : (
                    <HorizontaLDots className="size-6" />
                  )}
                </h2>
                {renderMenuItems(othersItems, "others")}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;