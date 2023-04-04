import { ReactNode } from 'react';
import styles from './FadeIn.module.scss';

interface props {
	children: ReactNode;
}

const FadeIn = ({ children }: props) => {
	return <div className={styles.root}>{children}</div>;
};

export default FadeIn;
