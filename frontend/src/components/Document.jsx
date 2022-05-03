import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Document() {
  const [docs, setDocs] = useState([]);
  const [doc, setDoc] = useState({});
  const [searchPreview, setSearchPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const previewBox = useRef();
  let key = 0;

  const getAllDocs = async () => {
    const res = await axios.get("/docs");
    const docsAll = res.data;
    setDocs(docsAll.reverse());
  };

  const getDocById = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    const res = await axios.get(`/docs/view/${id}`);
    const selectedDoc = res.data;
    setDoc(selectedDoc);
  };

  const searchDocs = (e) => {
    let matches = docs.filter((el) => {
      const regEx = new RegExp(`${e.target.value}`, "gi");
      return el.doc.match(regEx);
    });

    if (e.target.value.length === 0) {
      matches = [];
    }
    console.log(matches);
    outputHtml(matches);
  };

  const outputHtml = (matchesArr) => {
    console.log(matchesArr.length);
    if (matchesArr.length > 0) {
      const html = matchesArr.map((el) => {
        return (
          <div className="result" key={key + 1}>
            <h4
              onClick={async () => {
                const res = await axios.get(`/docs/view/${el.id}`);
                const selectedDoc = res.data;
                setDoc(selectedDoc);
              }}
            >
              {el.doc}
            </h4>
          </div>
        );
      });
      setSearchPreview(html);
      setShowPreview(true);
    } else {
      console.log("No results from search");
      setSearchPreview(null);
      setShowPreview(false);
    }
  };

  useEffect(() => {
    getAllDocs();
  }, []);

  useEffect(() => {}, [docs, doc]);

  if (docs && docs.length > 0) {
    return (
      <div className="documents">
        <h2 className="documents-title">Documents</h2>
        <div>
          <form>
            <select>
              <option value="week1">week1</option>
              <option value="week2">week2</option>
              <option value="week3">week3</option>
              <option value="week4">week4</option>
              <option value="week5">week5</option>
            </select>
            <select>
              <option value="instructor">instructors</option>
              <option value="student">students</option>
            </select>
            <input type="url" placeholder="URL" onChange={searchDocs} />
            <input type="submit" value="Search Document List" />
          </form>

          {searchPreview ? (
            <div className="preview-box">{searchPreview}</div>
          ) : (
            <div className="preview-box"></div>
          )}

          <h3 className="documents-title">search from document below</h3>
          <div className="show-document">
            <select onChange={getDocById} required>
              <option hidden>-- Document --</option>
              {docs.map((doc, index) => {
                return (
                  <option key={index} value={doc.id}>
                    {doc.doc}
                  </option>
                );
              })}
            </select>
            <button>Show Document</button>
          </div>

          {doc.id ? (
            <table className="document-table doc-selected">
              <tbody>
                <tr>
                  <td className="td-id">{doc.id}</td>
                  <td className="td-url">{doc.doc}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            ""
          )}

          <div>
            <h3 className="documents-title">your documents</h3>
            {docs.map((doc, index) => (
              <table key={index} className="document-table">
                <tbody>
                  <tr>
                    <td className="td-id">{doc.id}</td>
                    <td className="td-url">{doc.doc}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (docs.length === 0) {
    return <div>There are no docuemnts</div>;
  }
}

export default Document;
