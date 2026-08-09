# Generates all practice datasets for the Power BI Zero-to-Expert course.
# Deterministic (seed=42) so labs match what you see.
import csv, random, os
from datetime import date, timedelta

random.seed(42)
BASE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "datasets"))
os.makedirs(BASE, exist_ok=True)

def write_csv(name, header, rows):
    path = os.path.join(BASE, name)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)
    print(f"{name}: {len(rows)} rows")

# ---------------- Customers.csv ----------------
CITIES = [
    ("Delhi", "Delhi", "North"), ("Mumbai", "Maharashtra", "West"),
    ("Bengaluru", "Karnataka", "South"), ("Chennai", "Tamil Nadu", "South"),
    ("Kolkata", "West Bengal", "East"), ("Hyderabad", "Telangana", "South"),
    ("Pune", "Maharashtra", "West"), ("Ahmedabad", "Gujarat", "West"),
    ("Jaipur", "Rajasthan", "North"), ("Lucknow", "Uttar Pradesh", "North"),
    ("Kochi", "Kerala", "South"), ("Nagpur", "Maharashtra", "West"),
    ("Patna", "Bihar", "East"), ("Guwahati", "Assam", "East"),
    ("Chandigarh", "Punjab", "North"),
]
NAMES = ["Aarav Sharma","Vihaan Verma","Ananya Patel","Diya Gupta","Arjun Mehta","Sara Iyer",
"Ishaan Khan","Myra Singh","Kabir Das","Anika Nair","Rohan Joshi","Priya Chopra","Aditya Reddy",
"Meera Agarwal","Karan Malhotra","Nisha Menon","Rahul Bose","Pooja Kulkarni","Sameer Desai",
"Neha Kapoor","Vikram Pillai","Ritu Rao","Farhan Sethi","Alia Jain","Dev Mukherjee","Tara Saxena",
"Yash Bhatt","Kavya Chandra","Nikhil Grover","Zoya Mirza"]
SEGMENTS = ["Consumer", "Corporate", "Home Office"]

cust_rows = []
for i, name in enumerate(NAMES, start=1):
    city, state, region = random.choice(CITIES)
    join = date(2021, 1, 1) + timedelta(days=random.randint(0, 1000))
    cust_rows.append([i, name, random.choice(SEGMENTS), city, state, region, join.isoformat()])
write_csv("Customers.csv",
          ["CustomerID", "CustomerName", "Segment", "City", "State", "Region", "JoinDate"],
          cust_rows)

# ---------------- Products.csv ----------------
# (Name, Category, SubCategory, Brand, Cost, Price)
P = [
 ("Laptop Pro 14","Electronics","Laptops","TechVista",52000,65999),
 ("Laptop Air 13","Electronics","Laptops","TechVista",41000,52999),
 ("Smartphone X5","Electronics","Phones","Pixelo",15500,21999),
 ("Smartphone Lite","Electronics","Phones","Pixelo",8000,11999),
 ("Wireless Mouse","Electronics","Accessories","ClickPro",450,799),
 ("Mechanical Keyboard","Electronics","Accessories","ClickPro",1800,2999),
 ("27-inch Monitor","Electronics","Displays","OptiView",9500,14999),
 ("Noise-Cancel Headphones","Electronics","Audio","SonicWave",4200,6999),
 ("USB-C Docking Station","Electronics","Accessories","ClickPro",3800,5999),
 ("Office Chair Ergo","Furniture","Chairs","ComfySeat",6500,10999),
 ("Gaming Chair","Furniture","Chairs","ComfySeat",9000,15499),
 ("Standing Desk","Furniture","Desks","WorkWell",12000,18999),
 ("Bookshelf 4-Tier","Furniture","Storage","WoodCraft",3200,5499),
 ("Filing Cabinet","Furniture","Storage","SteelKraft",2800,4699),
 ("Meeting Table 6-Seat","Furniture","Tables","WoodCraft",15000,24999),
 ("Notebook A5 (Pack of 5)","Office Supplies","Paper","NoteWell",220,399),
 ("Gel Pen Pack (12)","Office Supplies","Writing","NoteWell",150,299),
 ("Whiteboard 3x2 ft","Office Supplies","Boards","BoardPro",900,1599),
 ("A4 Paper Ream","Office Supplies","Paper","NoteWell",260,449),
 ("Desk Organizer","Office Supplies","Accessories","NoteWell",350,599),
 ("Stapler Heavy Duty","Office Supplies","Accessories","GripFast",280,499),
 ("Coffee Maker 12-Cup","Appliances","Kitchen","BrewHaus",2400,3999),
 ("Microwave 20L","Appliances","Kitchen","BrewHaus",5200,8499),
 ("Air Fryer 4L","Appliances","Kitchen","BrewHaus",4500,7499),
 ("Water Purifier UV","Appliances","Home","AquaPure",7800,12499),
 ("Desk Fan 12-inch","Appliances","Home","WindFlow",1100,1899),
]
prod_rows = [[i + 1, n, c, s, b, cost, price] for i, (n, c, s, b, cost, price) in enumerate(P)]
write_csv("Products.csv",
          ["ProductID", "ProductName", "Category", "SubCategory", "Brand", "UnitCost", "UnitPrice"],
          prod_rows)

# ---------------- Sales.csv ----------------
sales_rows = []
for oid in range(1, 1301):
    d = date(2023, 1, 1) + timedelta(days=random.randint(0, 1094))  # 2023-2025
    cid = random.randint(1, len(NAMES))
    pid = random.randint(1, len(P))
    qty = random.randint(1, 8)
    price = P[pid - 1][5]
    disc = random.choice([0, 0, 0, 0, 0.05, 0.10, 0.15, 0.20])
    sales_rows.append([oid, d.isoformat(), cid, pid, qty, price, disc])
write_csv("Sales.csv",
          ["OrderID", "OrderDate", "CustomerID", "ProductID", "Quantity", "UnitPrice", "Discount"],
          sales_rows)

# ---------------- Targets.csv ----------------
target_rows = []
for m in range(1, 13):
    for r in ["North", "South", "East", "West"]:
        target_rows.append([f"2025-{m:02d}-01", m, r, random.randint(180, 380) * 1000])
write_csv("Targets.csv", ["MonthStart", "Month", "Region", "SalesTarget"], target_rows)

# ---------------- Messy_Sales_Raw.csv (Power Query cleaning lab) ----------------
REGION_VARIANTS = {"North": ["North", "north", "NORTH", " North "],
                   "South": ["South", "south", "SOUTH", "South  "],
                   "East": ["East", "east", "EAST", "East "],
                   "West": ["West", "west", "WEST", " West"]}
cust_by_id = {r[0]: r for r in cust_rows}
messy_rows = []
for s in random.sample(sales_rows, 140):
    oid, dstr, cid, pid, qty, price, disc = s
    d = date.fromisoformat(dstr)
    date_str = d.strftime("%d-%m-%Y") if random.random() < 0.30 else d.isoformat()
    pname = P[pid - 1][0]
    if random.random() < 0.35:
        pname = "  " + pname.lower() + " "
    region = random.choice(REGION_VARIANTS[cust_by_id[cid][5]])
    r = random.random()
    q = "" if r < 0.06 else ("N/A" if r < 0.09 else qty)
    rp = random.random()
    p_str = f"₹{price:,}" if rp < 0.35 else (f"{price:,}" if rp < 0.43 else str(price))
    messy_rows.append([f"ORD-{10000 + oid}", date_str, pname, region, q, p_str])
messy_rows += [list(x) for x in random.sample(messy_rows, 8)]  # duplicates
write_csv("Messy_Sales_Raw.csv", ["OrderNo", "Order Date", "Product", "Region", "Qty", "Price"], messy_rows)

print("\nAll datasets written to:", BASE)
