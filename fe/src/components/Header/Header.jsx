import React, { useState, useEffect } from "react";
import './styles.css';
import { MenuOutlined, ShoppingCartOutlined, DownOutlined, RightOutlined, SearchOutlined, PhoneFilled } from '@ant-design/icons';
import SlideBarMenu from "../SlideBarMenu/SlideBarMenu";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SmallBanner from "../../image/smallBanner.png";

const Header = () => {
    const [isDropdownOpen1, setIsDropdown1] = useState(false);
    const [isDropdownOpen2, setIsDropdown2] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [search, setSearch] = useState("");

    const context = useAuth();

    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/product?search=${search}`);
        }
    };

    const { auth } = context;

    const role = localStorage.getItem("role");

    useEffect(() => {
        if (auth) {
            const token = localStorage.getItem("token");
            setLoggedIn(!!token);
        }

    }, [auth]);

    const handleMouseEnter = (id) => {
        switch (id) {
            case 1:
                setIsDropdown1(true);
                break;
            case 2:
                setIsDropdown2(true);
                break;
            default:
                break;
        }
    };

    const handleMouseLeave = (id) => {
        switch (id) {
            case 1:
                setIsDropdown1(false);
                break;
            case 2:
                setIsDropdown2(false);
                break;
            default:
                break;
        }
    };

    const handleMouseOverTab = (tabId) => {
        setActiveTab(tabId);
    };

    const handleMouseLeaveTab = () => {
        setActiveTab(null);
    };

    const handleOpenSlideMenu = () => {
        setIsSlideMenuOpen(true);
    }

    const handleLogout = async (e) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/sign-in");
        } catch (error) {
            console.error(error);
        }
    };

    const reddot = {
        backgroundColor: "red",
        position: "absolute",
        width: "20px",
        height: "20px",
        top: "0",
        right: "0",
        borderRadius: "50%",
        fontSize: "15px",
    };




    return (
        <header id="header" className="header has-sticky sticky-jump">
            <SlideBarMenu
                openProp={isSlideMenuOpen} setOpenProp={setIsSlideMenuOpen}
            />
            <div className="header-wrapper">
                <div id="masthead" className="header-main show-logo-center hide-for-sticky nav-dark">
                    <div className="header-inner flex-row container logo-center medium-logo-center" role="navigation">
                        <div id="logo" className="flex-col logo">
                            <a href="http://localhost:3000" title=" ... Diamiond - Phân phối Sỉ Và Lẻ Kim Cương Việt Nam" rel="home">
                                <img width="130" height="122"
                                    src="https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png"
                                    className="header-logo-dark" alt="Cao Hùng Diamond" />
                            </a>
                        </div>

                        {/* Mobile Left Elements */}
                        <div className="flex-col show-for-medium flex-left">
                            <ul className="mobile-nav nav nav-left ">
                            </ul>
                        </div>

                        {/* Left Elements */}
                        <div className="flex-col hide-for-medium flex-left">
                            <ul className="header-nav header-nav-main nav nav-left  nav-uppercase">
                                <li className="html custom html_topbar_left">
                                    Hệ thống showrooms
                                    <br />CN HCM: 35 Trần Phú, Phường 4, quận 5, TP. HCM<br />
                                    CN CT: 53 Trần Phú, Ninh Kiều, Cần Thơ
                                </li>
                            </ul>
                        </div>

                        {/* Right Elements  */}
                        <div className="flex-col hide-for-medium flex-right">
                            <ul className="header-nav header-nav-main nav nav-right  nav-uppercase">
                                <li className="html custom html_topbar_right"><PhoneFilled /> 0933 1977 55 - 0877
                                    056 688</li>
                                <li className="cart-item has-icon">
                                    {role && role === "Customer" && (
                                        <a href="http://localhost:3000/cart" className="header-cart-link is-small"
                                            title="Giỏ hàng">
                                            <span className="header-cart-title">
                                                Giỏ hàng </span>
                                            <ShoppingCartOutlined />
                                            {/* <div style={reddot}>{context.productNumber}</div> */}
                                        </a>
                                    )}
                                </li>
                                <li className="header-search-form search-form html relative has-icon">
                                    <div className="header-search-form-wrapper">
                                        <div className="searchform-wrapper ux-search-box relative form-flat is-normal">

                                            <div className="flex-row relative">
                                                <div className="flex-col flex-grow">
                                                    <label className="screen-reader-text"
                                                        htmlFor="woocommerce-product-search-field-0">Tìm kiếm:</label>
                                                    <input type="search" id="woocommerce-product-search-field-0"
                                                        className="search-field mb-0" placeholder="Tìm kiếm…" name="s"
                                                        autoComplete="off" onChange={(e) => setSearch(e.target.value)}
                                                        onKeyPress={handleKeyPress} />
                                                    <input type="hidden" name="post_type" />
                                                </div>
                                                <div className="flex-col">
                                                    <button
                                                        className="ux-search-submit submit-button secondary button  icon mb-0"
                                                        onClick={() => navigate(`/product?search=${search}`)}
                                                    >
                                                        <SearchOutlined /> </button>
                                                </div>
                                            </div>
                                            <div className="live-search-results text-left z-top">
                                                <div className="autocomplete-suggestions"
                                                    style={{ position: 'absolute', display: 'none', maxHeight: '300px', zIndex: 9999 }}>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="container">
                        <div className="top-divider full-width"></div>
                    </div>
                </div>
                <div id="wide-nav" className="header-bottom wide-nav nav-dark flex-has-center">
                    <div className="flex-row container">

                        <div className="flex-col hide-for-medium flex-center">
                            <ul className="nav header-nav header-bottom-nav nav-center  nav-uppercase">
                                <li id="menu-item-6344"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1840 current_page_item menu-item-6344 active menu-item-design-default "
                                >
                                    <a href="/" aria-current="page" className="nav-top-link">HOME</a>
                                </li>
                                <li id="menu-item-6346"
                                    className={`menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-has-children menu-item-6346 menu-item-design-container-width menu-item-has-block has-dropdown has-icon-left ${isDropdownOpen1 ? 'current-dropdown' : ''}`}
                                    onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
                                    <a href="http://localhost:3000/product" className="nav-top-link"
                                        aria-expanded={isDropdownOpen1 ? 'true' : 'false'} aria-haspopup="menu"><img className="ux-menu-icon entered lazyloaded"
                                            width="25" height="25"
                                            alt="Icon nhẫn kim cương"
                                            src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nu.png"
                                            data-ll-status="loaded" />Trang sức kim cương<DownOutlined /></a>
                                    <div className="sub-menu nav-dropdown" style={{ top: '50px', right: '0', bottom: '0', left: '0px', width: '823px' }}>
                                        <div className="row row-small" id="row-343878564">
                                            <div id="col-153294758" className="col small-12 large-12">
                                                <div className="col-inner">

                                                    <div className="mega-menu" id="362-megamenu">
                                                        <div className="row row-small">
                                                            <div className="col large-3">
                                                                <div className="col-inner">
                                                                    <div className="menu-tab">

                                                                        <a href="http://localhost:3000/product/nkc"
                                                                            className={`tablinks tablinks-362 has-child ${activeTab === 363 ? 'active' : ''}`}
                                                                            onMouseEnter={() => handleMouseOverTab(363)} >
                                                                            <img src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nu.png"
                                                                                alt="Nhẫn Kim Cương" />
                                                                            <span className="cat-name">Nhẫn Kim Cương</span>
                                                                        </a>
                                                                        <a href="http://localhost:3000/product/bt"
                                                                            className={`tablinks tablinks-362 has-child ${activeTab === 364 ? 'active' : ''}`}
                                                                            onMouseEnter={() => handleMouseOverTab(364)} >
                                                                            <img
                                                                                alt="Bông Tai Kim Cương"
                                                                                src="https://caohungdiamond.com/wp-content/uploads/2022/06/bong-tai.png" />
                                                                            <span className="cat-name">Bông Tai Kim Cương</span>
                                                                        </a>
                                                                        <a href="http://localhost:3000/product/dc"
                                                                            className={`tablinks tablinks-362 has-child ${activeTab === 365 ? 'active' : ''}`}
                                                                            onMouseEnter={() => handleMouseOverTab(365)} >
                                                                            <img
                                                                                alt="Mặt Dây Chuyền Kim Cương"
                                                                                src="https://caohungdiamond.com/wp-content/uploads/2024/04/i-mat-day-chuyen-kim-cuong.png" />
                                                                            <span className="cat-name">Mặt Dây Chuyền Kim
                                                                                Cương</span>
                                                                        </a>
                                                                        <a href="http://localhost:3000/product/vt"
                                                                            className={`tablinks tablinks-362 has-child ${activeTab === 366 ? 'active' : ''}`}
                                                                            onMouseEnter={() => handleMouseOverTab(366)} >
                                                                            <img
                                                                                alt="Lắc tay, vòng tay kim cương"
                                                                                src="https://caohungdiamond.com/wp-content/uploads/2023/11/icon-vong-tay-kim-cuong.png" />
                                                                            <span className="cat-name">Lắc tay, vòng tay kim
                                                                                cương</span>
                                                                        </a>
                                                                        <a href="http://localhost:3000/product/vdc"
                                                                            className={`tablinks tablinks-362 has-child ${activeTab === 367 ? 'active' : ''}`}
                                                                            onMouseEnter={() => handleMouseOverTab(367)}>
                                                                            <img
                                                                                alt="Vỏ Mặt Dây Chuyền Kim Cương"
                                                                                src="https://caohungdiamond.com/wp-content/uploads/2022/08/vo-mat-day-chuyen.png" />
                                                                            <span className="cat-name">Vỏ Mặt Dây Chuyền Kim
                                                                                Cương</span>
                                                                        </a>
                                                                        <a href="http://localhost:3000/product/vn"
                                                                            className={`tablinks tablinks-362 has-child ${activeTab === 368 ? 'active' : ''}`}
                                                                            onMouseEnter={() => handleMouseOverTab(368)} >
                                                                            <img
                                                                                alt="Vỏ Nhẫn kim Cương"
                                                                                src="https://caohungdiamond.com/wp-content/uploads/2022/06/vo-nhan.png" />
                                                                            <span className="cat-name">Vỏ Nhẫn kim Cương</span>
                                                                        </a>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col large-9">
                                                                <div className="col-inner">
                                                                    <div id="363"
                                                                        className={`menu-tabcontent menu-tabcontent-362 ${activeTab === 363 ? 'active' : ''}`}>
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                    {/* <ul className="mega-menu-child">

                                                                                        <li>
                                                                                            <a
                                                                                                href="">Nhẫn
                                                                                                Kim Cương Nam</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a
                                                                                                href="">Nhẫn
                                                                                                Kim Cương Nữ</a>
                                                                                        </li>

                                                                                    </ul> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Nhẫn Kim Cương Tự Nhiên GIA Đẹp Giá Rẻ Cao Cấp"
                                                                                            width="100%"
                                                                                            src={SmallBanner} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="370" className={`menu-tabcontent menu-tabcontent-362 ${activeTab === 364 ? 'active' : ''}`}>
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Bông tai kim cương"
                                                                                            width="100%"
                                                                                            src={SmallBanner} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="384" className={`menu-tabcontent menu-tabcontent-362 ${activeTab === 365 ? 'active' : ''}`}>
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Mặt Dây Chuyền Kim Cương"
                                                                                            width="100%"
                                                                                            src={SmallBanner} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="438" className={`menu-tabcontent menu-tabcontent-362 ${activeTab === 366 ? 'active' : ''}`}>
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Banner Lắc tay, vòng tay kim cương"
                                                                                            width="100%"
                                                                                            src={SmallBanner} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="369" className={`menu-tabcontent menu-tabcontent-362 ${activeTab === 367 ? 'active' : ''}`}>
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Vỏ mặt dây chuyền kim cương Cao Hùng"
                                                                                            width="100%"
                                                                                            src="https://caohungdiamond.com/wp-content/uploads/2022/08/vo-mat-day-chuyen-kim-cuong-cao-hung.jpg" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="365" className={`menu-tabcontent menu-tabcontent-362 ${activeTab === 368 ? 'active' : ''}`}>
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                    {/* <ul className="mega-menu-child">

                                                                                        <li>
                                                                                            <a
                                                                                                href="">Vỏ
                                                                                                Nhẫn Kim Cương Nam</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a
                                                                                                href="">Vỏ
                                                                                                Nhẫn Kim Cương Nữ</a>
                                                                                        </li>

                                                                                    </ul> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Vỏ nhân kim cương" width="100%"
                                                                                            src="https://caohungdiamond.com/wp-content/uploads/2022/07/vo-nhan-kim-cuong.jpg" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                {/* <li id="menu-item-6345"
                                    className={`menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-has-children menu-item-6345 menu-item-design-container-width menu-item-has-block has-dropdown has-icon-left  ${isDropdownOpen2 ? 'current-dropdown' : ''}`}
                                    onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
                                    <a href="" className="nav-top-link"
                                        aria-expanded={isDropdownOpen2 ? "true" : "false"} aria-haspopup="menu"><img className="ux-menu-icon entered lazyloaded"
                                            width="25" height="25"
                                            alt="Nhẫn cưới kim cương Icon"
                                            src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-cuoi.png"
                                            data-ll-status="loaded" />Trang sức cưới<DownOutlined /></a>
                                    <div className="sub-menu nav-dropdown" style={{ top: '50px', right: '0', bottom: '0', left: '0px', width: '823px' }}>
                                        <div className="row row-small" id="row-862664933">


                                            <div id="col-129762351" className="col small-12 large-12">
                                                <div className="col-inner">



                                                    <div className="mega-menu" id="371-megamenu">
                                                        <div className="row row-small">
                                                            <div className="col large-3">
                                                                <div className="col-inner">
                                                                    <div className="menu-tab">

                                                                        <a href=""
                                                                            className="tablinks tablinks-371 active has-child"
                                                                        >
                                                                            <img
                                                                                alt="Nhẫn Cưới Kim Cương"
                                                                                src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-cuoi.png" />
                                                                            <span className="cat-name">Nhẫn Cưới Kim Cương</span>
                                                                        </a>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col large-9">
                                                                <div className="col-inner">
                                                                    <div id="372"
                                                                        className="menu-tabcontent menu-tabcontent-371 active">
                                                                        <div className="row row-small">
                                                                            <div className="col large-4">
                                                                                <div className="col-inner">
                                                                                    <ul className="mega-menu-child">
                                                                                        <li>
                                                                                            <a
                                                                                                href="">Nhẫn
                                                                                                Kim Cương Cầu Hôn</a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col large-8">
                                                                                <div className="col-inner">
                                                                                    <div className="mega-banner">
                                                                                        <img
                                                                                            alt="Nhẫn Cặp, Nhẫn Cưới Kim Cương Đẹp Nhất"
                                                                                            width="100%"
                                                                                            src="https://caohungdiamond.com/wp-content/uploads/2023/10/nhan-cap-nhan-cuoi-kim-cuong-caohungdiamond.jpg" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                                <li id="menu-item-6471"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6471 menu-item-design-default has-icon-left">
                                    <a href="/price-list" className="nav-top-link"><img
                                        className="ux-menu-icon entered lazyloaded" width="25" height="25"
                                        alt="Viên kim cương Icon"
                                        src="https://caohungdiamond.com/wp-content/uploads/2024/04/Vien-Kim-Cuong-icon.png"
                                        data-ll-status="loaded" />Bảng giá kim cương</a></li>
                                <li id="menu-item-28272"
                                    className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-28272 menu-item-design-default">
                                    <a href="" className="nav-top-link">Kiến thức trang sức</a>
                                </li>
                                {/* <li id="menu-item-28273"
                                    className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-28273 menu-item-design-default">
                                    <a href="" className="nav-top-link">Kiến
                                        thức kim cương</a></li> */}
                                <li id="menu-item-6347"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6347 menu-item-design-default">
                                    <a href="/Introduction" className="nav-top-link">Giới thiệu</a></li>
                                <li id="menu-item-6409"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                    <a href="" className="nav-top-link">Liên hệ</a></li>



                                {role && role === "Admin" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/home" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Manager" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/product" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Sale" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/order" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Delivery" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/order" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Customer" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/Profile" className="nav-top-link">PROFILE</a></li>
                                )}


                                {isLoggedIn && (
                                    <>
                                        <li id="menu-item-6409" onClick={() => handleLogout()}
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                            <a href="" className="nav-top-link">Logout</a></li>
                                    </>
                                )}
                                {!isLoggedIn && (
                                    <>
                                        <li id="menu-item-6409"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                            <a href="/sign-in" className="nav-top-link">Đăng nhập</a></li>
                                        <li id="menu-item-6409"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                            <a href="/sign-up" className="nav-top-link">Đăng ký</a></li>
                                    </>
                                )}





                            </ul>
                        </div>

                        <div className="flex-col show-for-medium flex-grow">
                            <ul className="nav header-bottom-nav nav-center mobile-nav  nav-uppercase">
                                <li className="nav-icon has-icon" onClick={handleOpenSlideMenu}>
                                    <a href="#" data-open="#main-menu" data-pos="left" data-bg="main-menu-overlay"
                                        data-color="dark" className="is-small" aria-label="Menu" aria-controls="main-menu"
                                        aria-expanded="false">
                                        <MenuOutlined />
                                    </a>
                                </li>
                                <li className="html custom html_nav_position_text"><a href=""><img
                                    src="https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png"
                                    alt="Logo Cao Hùng Diamond Mobile" style={{ maxHeight: '60px' }} /></a></li>
                                <li className="cart-item has-icon">

                                    {role && role === "Customer" && (
                                        <a href="http://localhost:3000/cart" className="header-cart-link is-small"
                                            title="Giỏ hàng">
                                            <span className="header-cart-title">
                                                Giỏ hàng </span>
                                            <ShoppingCartOutlined />
                                        </a>
                                    )}

                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="header-bg-container fill">

                </div>
            </div>
        </header>
    )
}

export default Header;