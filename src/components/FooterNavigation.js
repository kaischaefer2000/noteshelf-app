import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DescriptionIcon from '@material-ui/icons/Description';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { SvgIcon } from "@material-ui/core";
import {Link} from 'react-router-dom';



const FooterNavigation = () => {
    const [value, setValue] = React.useState('recents');
    console.log(value)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <BottomNavigation
          value={value}
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 fixed min-w-full bottom-0 pt-1"
          onChange={handleChange} 
          classes={{children: ''}}
          
        >

            <BottomNavigationAction 
                className="shadow-md"
                classes={{ label: 'text-white', icon: 'bg-white' }}
                label="Bücher"
                icon={
                    <Link to="/">
                        <SvgIcon viewBox="0 0 30 27" className="text-white">
                            <MenuBookIcon />
                        </SvgIcon>
                    </Link>
                } 
            />
            <BottomNavigationAction
                classes={{ label: 'text-white', icon: 'bg-white' }} 
                label="Artikel"     
                icon={
                    <Link to="/artikel">
                        <SvgIcon viewBox="0 0 30 27" className="text-white">
                            <DescriptionIcon />
                        </SvgIcon>
                    </Link>
                } 
            />
            <BottomNavigationAction
                classes={{ label: 'text-white', icon: 'bg-white' }} 
                label="Hinzufügen"     
                style={{pointerEvents: "none"}}
                icon={
                        <SvgIcon 
                            className="text-green-300"
                            style={{width: '3rem', height: '3rem', pointerEvents: 'none'}}
                        >
                            <AddCircleIcon />
                        </SvgIcon>
                } 
            />
            <BottomNavigationAction 
                classes={{ label: 'text-white', icon: 'bg-white'}} 
                label="Favoriten"   
                icon={
                    <Link to="/favoriten">
                        <SvgIcon  
                            viewBox="0 0 30 27" 
                            className="text-white"
                        >

                            <FavoriteIcon />
                        </SvgIcon>
                    </Link>
                } 
            />
            <BottomNavigationAction 
                classes={{ label: 'text-white', icon: 'bg-white' }} 
                label="Profil"      
                icon={
                    <Link to="/profil">
                        <SvgIcon viewBox="0 0 30 27" className="text-white">
                            <PersonIcon />
                        </SvgIcon>
                    </Link>
                } 
            />


        </BottomNavigation>
    )
}

export default FooterNavigation
