function Pagination({ pageInfo, page, onChange}) {
    return (
        <div className="pagination">
            <button onClick={() => onChange(page-1)} disabled={pageInfo?.first ?? true}>
                이전
            </button>
            <span className="meta">
                {page + 1} / {pageInfo?.totalPages ?? 1}
            </span>
            <button onClick={() => onChange(page +1)} disabled={pageInfo?.last ?? true}>
                다음
            </button>
        </div>
    );
}

export default Pagination;