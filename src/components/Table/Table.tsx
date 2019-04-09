import React, { useState, useEffect } from 'react';
import './Table.css';

export type StandardProps = {
  children?: any
  className?: any
}

export type IconSVG = {
  size?: string
  transform?: string
} & StandardProps

export type TableCellProps = {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  onClick?: Event
  onSortClick?: any
  sortKey?: string
  sortDirection?: SortDirection
} & StandardProps

export type SortDirection = 'asc' | 'desc' | '' | false | Object;

export const SortIconSVG = ({size, transform}: IconSVG) => 
  <svg className="order-icon" style={{ height: size, transform }} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>
  
SortIconSVG.defaultProps = {
  size: '12px'
}

export const Table = ({children}: StandardProps) =>
  <div className="grid-container table" role="table" aria-label="Table lists">{children}</div>

export const TableHead = ({children}: StandardProps) =>
  <div className="thead" role="rowgroup">{children}</div>

export const TableBody = ({children}: StandardProps) =>
  <div className="tbody" role="rowgroup">{children}</div>

export const TableRow = ({children}: StandardProps) =>
  <div className="grid-table tr">{children}</div>
  
export const TableCell = ({className, children, onSortClick, sortKey, sortDirection, align}: TableCellProps) => {

  let classNameDynamic: string = 'grid-cell '

  if (className) {
    classNameDynamic += className;
  }

  const defaultColor = '#0000008a'
  const sortColor = '#000000de'
  let currentColor
  let transform
  let icon

  if (sortDirection === 'asc') {
    currentColor = sortColor
    icon = <SortIconSVG transform={transform} />
    
  } else if (sortDirection === 'desc') {
    transform = 'rotate(180deg)'
    icon = <SortIconSVG transform={transform} />
    currentColor = sortColor
  } else {
    onSortClick? currentColor = defaultColor : ''
  }


  return (
    <div onClick={() => onSortClick && onSortClick(sortDirection, sortKey)} className={classNameDynamic} style={{ color: currentColor, textAlign: align }}>{children}{icon}</div>
  )
}
TableCell.defaultProps = {
  align: 'inherit',
  sortDirection: ''
};

export default Table;
