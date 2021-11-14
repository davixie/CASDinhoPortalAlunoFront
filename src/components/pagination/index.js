import React from 'react';
import { Pagination } from 'antd'
import './styles.css'

const Pages = ({ itensPerPage, totalItens, paginate }) => {

    return(
        <div className="pages">
            <Pagination
                defaultCurrent={1}
                total={totalItens}
                onChange={current => 
                    paginate(current)
                }
                pageSize={itensPerPage}
                className="pagination"
            />
        </div>
    )
}

export default Pages;
