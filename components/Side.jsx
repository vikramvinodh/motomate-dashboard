import { Sidebar, MenuItem, Menu, SubMenu } from "react-pro-sidebar";
import { sidebarData } from "./SidebarData";
import logo from "../public/logo.svg";
import { Link } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context";


function Side() {
  const { collapsed, setCollapsed, adminData } = useContext(AppContext)
  const [collapsedWidth, setCollapsedWidth] = useState('280px');


  const updateCollapsedWidth = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 700) {
      setCollapsedWidth('80px');
    } else if (windowWidth > 700 && windowWidth <= 1000) {
      setCollapsedWidth('280px');
    } else if (windowWidth > 1000) {
      setCollapsedWidth('80px')
    }
  };

  useEffect(() => {
    updateCollapsedWidth();
    window.addEventListener('resize', updateCollapsedWidth);

    return () => {
      window.removeEventListener('resize', updateCollapsedWidth);
    };
  }, []);

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#0c213a"
      width="280px"
      className="sidebar-grp"
      onBackdropClick={() => setCollapsed(false)}
      toggled={collapsed}
      breakPoint="md"
      collapsedWidth={collapsedWidth}
    >
      <Link style={{ textDecoration: 'none' }} to="/" className="clearbtn">
        <h6 className="text-center px-2 pt-2 pb-2  text-white d-flex align-items-center">
          Dashboard
        </h6>
      </Link>
      <hr className="m-1" />

      <Menu
        transitionDuration={700}
        menuItemStyles={{
          button: {
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          subMenuContent: {
            backgroundColor: "#0c213a",
            width: 'fit-content',
            "&:hover": {
              backgroundColor: "#0c213a",
            },
          },
        }}
      >
        {sidebarData.map((value, index) => {
          return value.sublist ? (
            adminData && value.flag.includes(adminData.isadmin) ? (
              <SubMenu
                key={index}
                label={value.label}
                icon={value.icon}
              >
                {value.sublist.map((items, i) => {
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={value.label.toLowerCase() + "/" + items.label.toLowerCase().replace(/\s+/g, "-")}
                      key={i}

                    >
                      <MenuItem
                        icon={<TbPointFilled fill="#7081b9" size={15} />}
                      >
                        {items.label}
                      </MenuItem>
                    </Link>
                  );
                })}
              </SubMenu>
            ) : null
          ) : (

            <Link style={{ textDecoration: 'none', color: 'white', fontSize: value?.fontSize }} to={value.label.toLowerCase().replace(/\s+/g, '-')} key={index}>
              {
                adminData && value.flag.includes(adminData.isadmin) ?
                  <MenuItem icon={value.icon}  >
                    {value.label}
                  </MenuItem>
                  : ''
              }
            </Link>
          )
        })
        }
      </Menu>
    </Sidebar >
  )
}

export default Side
