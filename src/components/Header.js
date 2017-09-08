import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';

export default function Header() {
    const style = {
        color: '#FFF',
        textDecoration: 'none'
    };

    return (
        <AppBar title={<Link style={style} to="/">Readable</Link>} showMenuIconButton={false} />
    );
}