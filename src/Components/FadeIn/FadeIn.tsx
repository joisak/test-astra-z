import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './FadeIn.module.scss';

interface props {
	children: ReactNode;
}

const FadeIn = ({ children }: props) => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return <div className={styles.root}>{children}</div>;
};

export default FadeIn;
