
import * as React from 'react';
import styles from './style.module.scss';

export interface IColumn {
    key: string;
    name: string;
}

export interface ITable {
    data: any[];
    columns: IColumn[];
}

export function Table({ data, columns }: ITable) {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        {columns && columns.map((item, index) => {
                            return (
                                <th key={index}>
                                    <span>{item.name}</span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {

                        return (
                            <>
                                <tr key={index}>
                                    {columns && columns.map((column, index) => {
                                        return (
                                                <td key={index}>{item[column.key]}</td>
                                        );
                                    })}
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
