import React, {useEffect, useState} from 'react';
import {Button, Grid, withStyles} from '@material-ui/core';
import {object} from 'prop-types';
import {Link} from 'react-router-dom';
import Media from 'react-media';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import {TABLET_BREAKPPOINT} from '../../../Helpers/breakpoints';
import {doQuery} from "../../../state/utils/contentful";

import AboveHeader from './Partials/AboveHeader';
import megaInShopAvatar from '../../../assets/images/mega-inshop.png';
import megaStylesAvatar from '../../../assets/images/mega-styles.png';
import ConnectedCommonLinks from '../Footer/Common/CommonLinks';

import logo from '../../../assets/images/mainLogo.svg';
import logoSmall from '../../../assets/images/logoSmall.svg';
import './Header.scss';

const styles = (theme) => ({
    logo: {
        marginTop: '-39px',
        height: '114px',
        margin: 'auto',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '-20px auto -10px',
            width: '200px',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    navbar: {
        margin: '18px auto 10px auto',
        maxWidth: '800px',
        justifyContent: 'space-between',
        display: 'flex',
        width: '100%'
    },
    underNavbar: {
        backgroundColor: '#FFDD30',
        height: '30px',
        display: 'flex',
        width: '100%'
    },
    logoLink: {
        display: 'inline-flex',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: '100%',
            overflow: 'hidden',
        },
    },
    divider: {
        height: '5px',
        borderBottom: '1px solid #D6D6D6',
        boxShadow: '0 4px 2px -1px #eee',
        marginBottom: '35px'
    }
});

const desktopNavLinks = [{
    label: 'In-Shop',
    submenu: [
        {label: 'Services', link: '/service/blow-services'},
        {label: 'Addons', link: '/service/add-ons'},
        {label: 'Help Center', link: '/faqs'},
    ],
    megaTitle: 'IN SHOP',
    megaLogo: megaInShopAvatar,
    link: '#'
}, {
    label: 'The Styles',
    link: '/the-styles',
    megaTitle: 'THE STYLES',
    megaLogo: megaStylesAvatar,
}, {
    label: 'Events',
    link: '/events',
}, {
    label: 'Memberships',
    link: '/barfly-membership',
}, {
    label: 'Gift Cards',
    link: '/',
}, {
    label: 'Franchising',
    link: '/franchising',
},{
    label: 'TBD',
    submenu: [
        {label: 'Meet The Stylist', link: '/service/blow-services'},
        {label: 'Best ButterCup', link: '/service/add-ons'},
    ],
    megaTitle: 'TBD',
    megaLogo: megaInShopAvatar,
    link: '#'
}];

const mobileNavLinks = [{
    label: 'In-Shop',
    submenu: [
        {label: 'Services', link: '/services'},
        {label: 'Addons', link: '/addons'},
        {label: 'Help Center', link: '/help-center'},
    ],
    link: '#'
}, {
    label: 'The Styles',
    link: '#',
    submenu: [],
    isStyles: true
}, {
    label: 'Events',
    link: '/events',
}, {
    label: 'Meet The Stylist',
    link: '/meet-the-stylist',
}, {
    label: 'Buttercup',
    link: '/buttercup',
}, {
    label: 'Memberships',
    link: '/barfly-membership',
}, {
    label: 'Gift Cards',
    link: '/',
}, {
    label: 'Franchising',
    link: '/franchising',
}, {
    label: 'Contact Us',
    link: '/contact',
}, {
    label: 'Legal',
    link: '/#',
    submenu: [
        {label: 'Terms of Service', link: ''},
        {label: 'Privacy Policy', link: ''},
        {label: 'Accessability Policy', link: ''},
        {label: 'Cancellation Policy', link: ''},
        {label: 'Membership Policy', link: ''},
    ]
}];

const InShopDropDownMenu = (classes, nav) => {
    return <div className="mega-dropdown">
        <Link
            className="navLink dropbtn"
            to={nav.link}
        >
            {nav.label}
        </Link>
        <Grid className="mega-menu-section dropdown-content">
            <div className="d-flex justify-content-center">
                <div className="d-block pr-100-px">
                    <h5 className="mega-title">{nav.megaTitle}</h5>
                    {nav.submenu.map((submenu) => (
                        <Link className="navLink" to={submenu.link}>{submenu.label}</Link>
                    ))}
                </div>
                <div className="d-block">
                    <img src={nav.megaLogo} alt="Mega Logo"/>
                </div>
            </div>
        </Grid>
    </div>
}

const TheStylesDropDownMenu = (classes, nav, styles) => {
    return <div className="mega-dropdown">
        <Link
            className="navLink dropbtn"
            to={nav.link}
        >
            {nav.label}
        </Link>
        <Grid className="mega-menu-section dropdown-content">
            <div className="d-flex justify-content-center">
                <div className="d-block pr-100-px">
                    <h5 className="mega-title">{nav.megaTitle}</h5>
                    {styles.map((style) => (
                        <Link className="navLink" to={'/the-styles/#' + style.slug}>{style.title}</Link>
                    ))}
                    <Link className="navLink" to='/dry-styling'>Dry Styling</Link>
                </div>
                <div className="d-block">
                    <img src={nav.megaLogo} alt="Mega Logo"/>
                </div>
            </div>
        </Grid>
    </div>;
}

const mobileDropDownMenu = (nav, styles) => {
    return <>
        <button className="dropdown-btn" onClick={(event) => {
            onDropDownClick(event.target);
        }}>{nav.label}
            <i className="fa fa-caret-down"/>
            <i className="fa fa-caret-up"/>
        </button>
        <div className="dropdown-container">
            {nav.isStyles && <>{styles.map((item) => {
                return <Link to={'/the-styles/#' + item.slug}>{item.title}</Link>;
            })}<Link to="/dry-styling">Dry Styling</Link></>}
            {!nav.isStyles && nav.submenu.map((item) => {
                return <Link to={item.link}>{item.label}</Link>;
            })}
        </div>
    </>;
}

function onDropDownClick(target) {
    let buttonElement = target;
    if (target.classList.contains('fa')) {
        buttonElement = target.parentElement;
    }
    buttonElement.classList.toggle("active");
    const dropdownContent = buttonElement.nextElementSibling;
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

const Header = ({classes}) => {
    const [styles, setStyles] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState('0');
    const [mainMarginLeft, setMainMarginLeft] = useState('0');

    const query = `{
                      stylesCollection(where: {slug: "the-styles"}) {
                        items {
                          stylesCollection {
                            items {
                              title
                              slug
                            }
                          }
                        }
                      }
                    }`;
    useEffect(() => {
        doQuery(query).then((data) => {
            const screenStyles = data.stylesCollection?.items?.length > 0 ? data.stylesCollection?.items[0] : [];
            setStyles(screenStyles.stylesCollection.items || []);
        })
    }, []);

    return <Grid className={classes.container}>
        <AboveHeader/>

        {/* Mobile sidebar */}
        <div id="mySidebar" className="sidebar" style={{width: sidebarWidth}}>
            <div className="sidebar-header">
                <PersonOutlineOutlinedIcon className={classes.icon} style={{height: '26px'}}/>
                <span>hi, Serena!</span>
                <Link to="/account">My Account</Link>
            </div>
            <a href="javascript:void(0)" className="closebtn" onClick={() => {
                setMainMarginLeft('0');
                setSidebarWidth('0');
            }}>&times;</a>
            {mobileNavLinks.map((nav) => (
                nav.submenu ? mobileDropDownMenu(nav, styles) :
                    <Link to={nav.link}>{nav.label}</Link>
            ))}
            <div className="support-section">
                <span className="title">CUSTOMER SUPPORT</span>
                <div className="divider"/>
                <span className="phone-number">(877) 379-2279</span>
                <span className="open-date-time">Monday-Friday, 9am - 5pm PST</span>
                <Link to="#">EMAIL US</Link>
                <Link to="#">FIND A DRYBAR LOCATION</Link>
                <div className="divider"/>
                <ConnectedCommonLinks/>
            </div>
        </div>
        <Media query={{maxWidth: TABLET_BREAKPPOINT}}>
            {(matches) => (matches ? (
                <Grid className="mobileHeader" id="main" style={{marginLeft: mainMarginLeft}}>
                    <Button className="mobileMenuButton">
                        <MenuIcon className="menuIcon" onClick={() => {
                            setMainMarginLeft('250px');
                            setSidebarWidth('250px');
                        }}/>
                    </Button>
                    <Link className={classes.logoLink} to="/">
                        <img className={classes.logo} src={logoSmall} alt="Drybar"/>
                    </Link>
                </Grid>
            ) : (
                <>
                    <Link className={classes.logoLink} to="/">
                        <img className={classes.logo} src={logo} alt="Drybar"/>
                    </Link>
                    <Grid className={classes.navbar}>
                        {desktopNavLinks.map((nav, index) => (
                            index === 0 || index === 6 ? InShopDropDownMenu(classes, nav) :
                                index === 1 ? TheStylesDropDownMenu(classes, nav, styles) :
                                    <Link
                                        className="navLink"
                                        to={nav.link}
                                    >
                                        {nav.label}
                                    </Link>

                        ))}
                    </Grid>
                </>
            ))}
        </Media>
        <Grid className="underNavbar">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Grid>
    </Grid>;
};

Header.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(Header);
