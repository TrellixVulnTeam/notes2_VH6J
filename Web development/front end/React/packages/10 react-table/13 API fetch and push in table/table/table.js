import React, { useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  fetchUser  from '../redux2/actions';

import {useTable, useGlobalFilter} from 'react-table';
import Filter from './filter';

    
const COLUMNS = [
    {
        Header : "ID",
        accessor : "id"
    },
    {
        Header : "Name",
        accessor : "name"
    },
    {
        Header : "Email",
        accessor : "email"
    },
    {
        Header : "Phone",
        accessor : "phone"
    },
    {
       Header : "Website",
       accessor : 'website'
    },
    {
        Header : "Address",
        columns : [
            {
                Header : "Street",
                accessor : "address.street"
            },
            {
                Header : "Suite",
                accessor : "address.suite"
            },
            {
                Header : "City",
                accessor : "address.city"
            },
            {
                Header : "Zip-code",
                accessor : "address.zipcode"
            },

        ]
    },
    {
        Header: "Action",
        Cell: () => (
            <>
             <button> edit </button>
             <button> Del </button>
            </>
          )
    }
    
]


function Container(){
    


    useEffect(()=> {
        dispatch( fetchUser())

    }, [])
    
    const userData = useSelector(state => state.users)
    const dispatch = useDispatch();
    const loading =  useSelector(state => state.loading);
    console.log(userData)
    const columns = useMemo(()=> COLUMNS);
    const data = useMemo(()=> userData);
    
    const tableInstance = useTable({
		columns,
		data
	}, useGlobalFilter)
      
	const  {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
        state,
		prepareRow,
        setGlobalFilter,
	} = tableInstance;
    
    const {globalFilter} = state; 


    if(loading){
    	return <h1> loading... </h1>
    }

    return (
        <>
        <Filter filter = {globalFilter} setFilter = {setGlobalFilter}/>
        <table className = "table table-striped " {...getTableProps()}>
				  <thead className = "bg-primary" >
					  {
						  headerGroups.map(headerGroup =>(
							  <tr {...headerGroup.getHeaderGroupProps()}>
								  {
									  headerGroup.headers.map(column=> (
                                        <>
										  <th {...column.getHeaderProps()}>
											  {column.render('Header')}
										  </th>
                                        </>
									  ))
								  }

							  </tr>
						  ))
					  }
				  </thead>
				  <tbody {...getTableBodyProps()}>
					  {
						  rows.map(row=> {
							  prepareRow(row)
							  return(
                                <>
                                 	
								  <tr{...row.getRowProps()}>
									{row.cells.map(cell => {
										return(
										
                                            <td {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
                    
                                            
										)
									})}
								  </tr>
                                 
                                </>
							  )
						  })
					  }
                 
					
				  </tbody>
			  </table>
        </>
    )
}


export default Container;