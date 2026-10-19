#!/usr/bin/env python3
"""Extract a read-only snapshot from Farhangian.xlsm into report/farhangian/data.json."""
from __future__ import annotations
import json
import os
from datetime import date, datetime, time, timezone
from pathlib import Path
import sys
import openpyxl

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "report" / "farhangian"
OUTPUT = DATA_DIR / "data.json"


def clean(value):
    if value is None:
        return None
    if isinstance(value, (datetime, date, time)):
        return value.isoformat()
    if isinstance(value, (str, int, float, bool)):
        return value
    return str(value)


def row_has_data(values):
    return any(v is not None and str(v).strip() != "" for v in values)


def main():
    candidates = [p for p in DATA_DIR.iterdir() if p.is_file() and p.suffix.lower() in (".xlsm", ".xlsx", ".xls") and p.name.lower().startswith("farhangian")]
    if not candidates:
        candidates = [p for p in DATA_DIR.iterdir() if p.is_file() and p.suffix.lower() in (".xlsm", ".xlsx")]
    if not candidates:
        sys.exit(f"ERROR: No Excel workbook found in {DATA_DIR}")
    source = sorted(candidates, key=lambda p: (p.name.lower() != "farhangian.xlsm", p.name.lower()))[0]

    # data_only=True reads cached formula results saved by Excel; it does not run macros.
    wb = openpyxl.load_workbook(source, data_only=True, read_only=True, keep_links=False)
    sheets = []
    for ws in wb.worksheets:
        nonempty = []
        max_col = 0
        for row_idx, values in enumerate(ws.iter_rows(values_only=True), start=1):
            vals = list(values)
            while vals and vals[-1] is None:
                vals.pop()
            if not row_has_data(vals):
                continue
            max_col = max(max_col, len(vals))
            nonempty.append({"rowNumber": row_idx, "cells": [clean(v) for v in vals]})
        if not nonempty:
            sheets.append({"name": ws.title, "title": ws.title, "headerRow": None, "rows": [], "rowCount": 0})
            continue
        # These header rows are the workbook's visible table headings.
        header_rows = {"Sheet1": 3, "Sheet2": 3, "Sheet6": 2}
        header_row = header_rows.get(ws.title)
        if header_row is None:
            header_row = nonempty[0]["rowNumber"]
        title = ws.title
        for item in nonempty[:3]:
            cells = item["cells"]
            if item["rowNumber"] == 1:
                text_values = [str(v).strip() for v in cells if isinstance(v, str) and v.strip()]
                if text_values:
                    title = max(text_values, key=len)
                    break
        data_rows = [r for r in nonempty if r["rowNumber"] >= header_row]
        sheets.append({"name": ws.title, "title": title, "headerRow": header_row,
                       "rows": data_rows, "rowCount": max(0, len(data_rows) - 1)})

    chart = {"spent": None, "remaining": None, "total": None, "percent": None}
    try:
        # The workbook's only donut chart refers to Sheet1!K6 and Sheet1!K16.
        chart_ws = wb["Sheet1"]
        spent = chart_ws["K6"].value
        remaining = chart_ws["K16"].value
        if isinstance(spent, (int, float)) and isinstance(remaining, (int, float)):
            total = spent + remaining
            chart = {"spent": spent, "remaining": remaining, "total": total,
                     "percent": (spent / total * 100) if total else 0}
    except Exception:
        pass
    wb.close()
    payload = {
        "project": "پروژه فرهنگیان",
        "sourceFile": source.name,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "chart": chart,
        "sheets": sheets,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temp = OUTPUT.with_suffix(".json.tmp")
    temp.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    temp.replace(OUTPUT)
    print(f"Updated {OUTPUT.relative_to(ROOT)} from {source.name}; sheets={len(sheets)}; chart={chart}")

if __name__ == "__main__":
    main()
