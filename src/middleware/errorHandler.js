// errorHandler.js
//
// TASK 4 — The ONE place every error is turned into an HTTP response.
// Express recognises this as the error handler ONLY because it has FOUR
// parameters: (err, req, res, next). Keep all four, even if you don't use next.
//
// Map each error TYPE to the right status:
//   ValidationError        -> 400, return the per-field messages from err.errors
//   CastError              -> 400, "Invalid ID format" (a bad ObjectId in the URL)
//   Duplicate key (11000)  -> 409, name the clashing field from err.keyValue
//   anything else          -> 500 (already done for you — log it, hide details)

export function errorHandler(err, req, res, next) {
  // TODO 4a: 
  if (err.name === "ValidationError"){
    const fields = {};
    for (const key in err.errors) fields[key] = err.errors[key].message;
  } //-> 400 with a { field: message } map
  //   const fields = {};
  //   for (const key in err.errors) fields[key] = err.errors[key].message;
    return res.status(400).json({ error: "ValidationError", fields });

  // TODO 4b:
   if (err.name === "CastError"){// -> 400
     return res.status(400).json({ error: "CastError", message: "Invalid ID format", field: err.path });}

  // TODO 4c: 
  if (err.code === 11000){ //-> 409
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: "DuplicateKey", message: field + " already exists", field });}

  // Fallback (provided) — unknown error.
  console.error(err);
  res.status(500).json({ error: "InternalServerError" });
}
