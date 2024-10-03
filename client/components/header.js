import Link from 'next/link';

export default ({ currentUser }) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" href="/">
                GitTix
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