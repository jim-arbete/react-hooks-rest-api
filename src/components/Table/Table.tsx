import React, { useState, useEffect } from 'react';
import './Table.css';

export type StandardProps = {
  children?: any
}

export type TableCellProps = {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  sortDirection?: SortDirection
} & StandardProps

export type SortDirection = 'asc' | 'desc' | false;


export const Table = ({children}: StandardProps) =>
  <div className="grid-container table" role="table" aria-label="Table lists">{children}</div>

export const TableHead = ({children}: StandardProps) =>
  <div className="thead" role="rowgroup">{children}</div>

export const TableBody = ({children}: StandardProps) =>
  <div className="tbody" role="rowgroup">{children}</div>

export const TableRow = ({children}: StandardProps) =>
  <div className="grid-table tr">{children}</div>
  
export const TableCell = ({children, align}: TableCellProps) =>
  <div className="grid-cell" style={{ textAlign: align }}>{children}</div>

TableCell.defaultProps = {
  align: 'inherit',
};

export default Table;
