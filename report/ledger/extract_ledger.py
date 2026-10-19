#!/usr/bin/env python3
"""استخراج تراز حسابداری شرکا به data.json

    python extract_ledger.py
    python extract_ledger.py ledger.xlsm
"""

import sys
import json
from pathlib import Path
from datetime import datetime, date, timezone

import openpyxl


def cell_value(v):
    if v is None:
        return None
    if isinstance(v, datetime):
        return v.strftime("%Y-%m-%d")
    if isinstance(v, date):
        return v.isoformat()
    if isinstance(v, float) and v.is_integer():
        return int(v)
    return v


def norm(text):
    return str(text).replace("ي", "ی").replace("ك", "ک").strip()


def extract_sheet(ws):
    max_r = 0
    max_c = 0
    scan_rows = min(ws.max_row or 1, 800)
    scan_cols = min(ws.max_column or 1, 20)
    for row in ws.iter_rows(min_row=1, max_row=scan_rows, max_col=scan_cols):
        for cell in row:
            if cell.value is not None:
                max_r = max(max_r, cell.row)
                max_c = max(max_c, cell.column)

    title = ws.title
    for coord in ("A1", "B1", "C1", "D1"):
        v = ws[coord].value
        if v and str(v).strip():
            title = str(v).strip()
            break

    if max_r == 0:
        return {"name": title, "title": title, "headerRow": None, "rows": [], "rowCount": 0}

    header_row = None
    for r in range(1, min(8, max_r + 1)):
        for c in range(1, min(8, max_c + 1)):
            v = ws.cell(r, c).value
            if v and norm(v) in ("تاریخ", "ردیف"):
                header_row = r
                break
        if header_row:
            break

    rows = []
    for r in range(1, max_r + 1):
        cells = [cell_value(ws.cell(r, c).value) for c in range(1, max_c + 1)]
        if any(v is not None and v != "" for v in cells):
            while cells and cells[-1] is None:
                cells.pop()
            rows.append({"rowNumber": r, "cells": cells})

    return {
        "name": title,
        "title": title,
        "headerRow": header_row,
        "rows": rows,
        "rowCount": len(rows),
    }


def partner_claims(wb):
    """آخرین مقدار «طلب حساب» هر شریک را از آخرِ شیت‌ها برمی‌گرداند."""
    found = {}
    keys = (
        ("داود", "davood"),
        ("محمد", "mohammad"),
        ("امید", "omid"),
    )
    for name in reversed(wb.sheetnames):
        ws = wb[name]
        local = {}
        max_r = min(ws.max_row or 1, 80)
        max_c = min(ws.max_column or 1, 16)
        for r in range(1, max_r + 1):
            for c in range(1, max_c):
                label = ws.cell(r, c).value
                value = ws.cell(r, c + 1).value
                if not isinstance(label, str) or not isinstance(value, (int, float)):
                    continue
                text = norm(label)
                if not text.startswith("طلب حساب"):
                    continue
                for person, key in keys:
                    if person in text:
                        local[key] = float(value)
        if len(local) == 3:
            found = local
            break
    davood = found.get("davood", 0)
    mohammad = found.get("mohammad", 0)
    omid = found.get("omid", 0)
    total = davood + mohammad + omid
    return {
        "davood": davood,
        "mohammad": mohammad,
        "omid": omid,
        "total": total,
        "spent": mohammad,
        "remaining": omid,
        "percent": (mohammad / total * 100) if total else 0,
    }


def main():
    script_dir = Path(__file__).resolve().parent
    if len(sys.argv) > 1:
        excel_path = Path(sys.argv[1])
        if not excel_path.is_absolute():
            excel_path = script_dir / excel_path
    else:
        candidates = [
            script_dir / "ledger.xlsm",
            Path("/workspace/attachments/ledger.xlsm"),
        ]
        excel_path = next((p for p in candidates if p.exists()), None)
        if not excel_path:
            print("فایل ledger.xlsm پیدا نشد.")
            sys.exit(1)

    print(f"در حال خواندن: {excel_path.name} ...")
    wb = openpyxl.load_workbook(excel_path, data_only=True)
    chart = partner_claims(wb)
    data = {
        "project": "حسابداری شرکا",
        "sourceFile": excel_path.name,
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00"),
        "chart": chart,
        "sheets": [extract_sheet(wb[name]) for name in wb.sheetnames],
    }
    out_path = script_dir / "data.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)
    print("data.json ساخته شد.")
    print(f"  طلب داود : {chart['davood']:,.0f}")
    print(f"  طلب محمد : {chart['mohammad']:,.0f}")
    print(f"  طلب امید : {chart['omid']:,.0f}")


if __name__ == "__main__":
    main()
