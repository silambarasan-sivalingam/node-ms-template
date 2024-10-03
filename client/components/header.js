import Link from 'next/link';

export default ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li className="nav-item" key={href}>
                    {label}
                </li>
            );
        });


    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" href="/">
                {label}
            </Link>

            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {currentUser ? (
                        <li className="nav-item">
                            <Link href="/auth/signout" className="nav-link">
                                Sign Out
                            </Link>
                        </li>
                    ) : (
                        <div>
                            <li className="nav-item">
                                <Link href="/auth/signin" className="nav-link">
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/auth/signup" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
};