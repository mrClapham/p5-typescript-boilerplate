import { IDraw } from 'lib/interfaces';
declare const renderFactory: (renderer: Function) => (target: string, width?: number, height?: number, sizeToParent?: boolean, optClassName?: string | null) => IDraw;
export { renderFactory };
