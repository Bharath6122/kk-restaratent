// Format: "# Category|image keyword" then "Item name|price" per line.
const RAW = `# Soups|soup
Tomato Soup|150
Sweet Corn Veg Soup|140
Veg Manchow Soup|150
Hot & Sour Veg / Mushroom Soup|140
Veg / Mushroom Clear Soup|140
Cream Mushroom Soup|160
Sweet Corn Chicken Soup|160
Hot & Sour Chicken Soup|160
Chicken Clear Soup|150
Chicken Manchow Soup|170
Cream Chicken Soup|170
Hot & Sour Mutton Soup|190
# Veg Starters|starter
Aloo Jeera|220
Chilli Potato Dry|280
Chilli Baby Corn Dry|280
Chilli Mushroom Dry|280
Chilli Gobi Dry|280
Chilli Paneer Dry|310
Gobi Manchurian Dry|280
Mushroom Manchurian Dry|280
Baby Corn Manchurian Dry|280
Veg Manchurian Dry|280
Paneer Manchurian Dry|310
Schezwan Vegetable Dry|290
Mushroom Pepper Fry|280
Golden Fried Baby Corn|280
Paneer Pakoda|310
French Fries|170
Masala Pappad|220
Roasted Pappad|50
Gobi 65|280
Green Salad|120
# Chicken & Egg Starters|chicken
Chilli Egg Dry|260
Egg Burge (Podimass)|130
Chicken 65|340
Pozichakozhi Fry|350
Chicken Lollipop (Dry/Saucy)|340/350
Dragon Chicken|370
Crispy Fried Chicken|350
Chicken Bell Pepper Fry|350
Chicken Kothamalli|340
Lemon Chicken|350
Shangai Chicken|340
Chettinad Chicken Dry|330
Chicken Pepper Fry|340
Chicken Chukka|360
Chilli Chicken Dry|340
Garlic Chicken Dry|340
Chicken Manchurian Dry|340
Schezwan Chicken Dry|340
# Mutton Starters|mutton
Mutton Chukka|450
Mutton Pepper Fry|460
Chilli Mutton Fry|480
Schezwan Mutton Fry|480
# Seafood Special|seafood
Fish Fry|440
Fish Finger|390
Chilli Fish Dry|390
Fish Manchurian Dry|390
Nethili Fish Fry|340
Crispy Squid Rings|360
Chilli Squid Dry|360
Fish 65|390
Chilli Prawn Dry|390
Prawn Manchurian Dry|420
Prawn Fry / Pepper Fry|410/420
Prawn 65|440
Shangai Prawn|440
Crab Lollipop|390
Chilli Crab Fry|410
# Tandoori Special|tandoori
Grilled Chicken Half/Full|360/630
Tandoori Chicken Half/Full|360/630
Chicken Tikka|360
Chicken Rangeela Kebab|390
Chicken Sesame Kebab|390
Chicken Bannu Kebab|390
Chicken Kali Mirchi Kebab|410
Chicken Haryali Kebab|390
Chicken Malai Kebab|390
Chicken Tangri Kebab (3 pcs)|390
# Breads|bread
Plain Roti|60
Butter Roti|70
Tandoori Paratha|70
Butter Paratha|80
Pudina Paratha|80
Chappathi|50
Plain Naan|60
Butter Naan|70
Garlic Naan|80
Plain Kulcha|70
Paneer Kulcha|90
Masala Kulcha|90
Onion Kulcha|80
Methi Kulcha|80
Pudina Kulcha|70
Tawa Paratha|50
# Biryani|biryani
Chicken Biriyani|290
Mutton Biriyani|390
Spl Chicken Biriyani (Ch 65 boneless)|330
Prawn Biriyani|390
Fish 65 Biriyani|350
Egg Biriyani|240
# Fried Rice & Pulav|rice
Veg Fried Rice|220
Mushroom Fried Rice|240
Paneer Fried Rice|250
Mixed Veg Fried Rice|260
Egg Fried Rice|240
Chicken Fried Rice|290
Mutton Fried Rice|390
Prawn Fried Rice|340
Mix Non-Veg Fried Rice|400
Veg Pulav|260
Paneer Pulav|270
Cashew Nut Pulav|310
Green Peas Pulav|260
Steam Rice|110
Jeera Rice|210
Ghee Rice|240
# Noodles|noodles
Veg Noodles|220
Mushroom Noodles|240
Paneer Noodles|250
Mixed Veg Noodles|260
Egg Fried Noodles|240
Chicken Noodles|270
Mutton Noodles|390
Prawn Noodles|340
Mix Non-Veg Noodles|400
American Chopsuey Veg/Non-Veg|330/390
# Veg Curries|curry
Dhal Fry|240
Dhal Tadka|260
Dhal Makhani|280
Aloo Gobi Masala|280
Green Peas Masala|280
Channa Masala|290
Mix Veg Curry|280
Kadai Vegetable|290
Kadai Mushroom|290
Mushroom Masala|290
Kadai Paneer|290
Mutter Paneer|310
Paneer Butter Masala|390
Malai Kofta|380
Veg Kofta|390
Paneer Pasinda|390
# Non-Veg Curries|curry
Egg Masala|230
Egg Burge Masala|240
Chicken Curry|330
Chettinad Chicken Curry|330
Pepper Chicken Gravy|340
Butter Chicken Masala|390
Kadai Chicken|360
Chicken Dopiyaza|360
Chicken Punjabi|390
Chicken Rogan Josh|360
Hyderabadi Chicken Gravy|390
Chicken Mughali (Sweet)|410
Naatukozhi Gravy|460
Chettinad Mutton Gravy|460
Chettinad Mutton Pepper Gravy|470
Kadai Mutton|470
Mutton Punjabi|470
Mutton Rogan Josh|470
Chettinad Prawn Masala|410
Kadai Prawn|430
# Desserts & Drinks|dessert
Carrot Halwa / with Ice Cream|90/120
Gulab Jamun / with Ice Cream|60/90
Brownie / with Ice Cream|90/120
Vanilla Ice Cream|70
Butterscotch Ice Cream|80
Strawberry Ice Cream|80
Mango Ice Cream|80
Chocolate Ice Cream|80
Cassata Slice|80
Pista Ice Cream|80
Black Currant Ice Cream|80
Fresh Lemon Soda|50
Fresh Lemon Juice|50
Sweet Lassi|70/110
Mineral Water|25
Soft Drinks|20`

const NONVEG = /chicken|mutton|prawn|fish|egg|crab|squid|nethili|pozicha|naatukozhi|burge|non-veg|tandoori|grilled|tangri/i
const TERMS = [['biriyani','chicken biryani'],['paneer','paneer tikka masala'],['prawn','prawn fry'],['crab','crab fry'],['squid','fried calamari'],['fish|nethili','fish fry'],['mutton','mutton curry'],['egg','egg curry'],['naan','naan'],['kulcha','kulcha'],['paratha','paratha'],['roti|chappathi','chapati'],['noodles|chopsuey','hakka noodles'],['rice|pulav','fried rice'],['ice cream|cassata','ice cream scoops'],['halwa','gajar halwa'],['gulab','gulab jamun'],['brownie','chocolate brownie'],['lassi','lassi'],['soda|juice','lemonade'],['water','bottled water'],['drinks','cola'],['gobi','gobi manchurian'],['mushroom','mushroom fry'],['fries','french fries'],['pappad','papadum'],['salad','green salad'],['soup','soup bowl'],['kebab|tikka|tandoori|grilled','tandoori chicken'],['chicken','chicken curry'],['dhal','dal tadka'],['aloo|potato','aloo jeera'],['corn','baby corn'],['kofta','malai kofta'],['channa','chana masala']]
const CATQ = {soup:'soup bowl',starter:'Indian vegetarian snacks',chicken:'fried chicken',mutton:'mutton curry',seafood:'fried fish',tandoori:'tandoori chicken',bread:'naan',biryani:'biryani',rice:'fried rice',noodles:'noodles',curry:'Indian curry',dessert:'Indian dessert'}

export const MENU = []
RAW.split('\n').forEach((l) => {
  if (l.startsWith('# ')) { const [name, kw] = l.slice(2).split('|'); MENU.push({ name, kw, items: [] }); return }
  const [name, price] = l.split('|'), cat = MENU[MENU.length - 1]
  const clean = name.replace(/\(.*?\)/g, '').split('/')[0].replace(/\b(Dry|Half|Full)\b/g, '').replace(/\s+/g, ' ').trim()
  const hit = TERMS.find(([re]) => new RegExp(re, 'i').test(name))
  const q = [...new Set([clean, hit && hit[1], CATQ[cat.kw]].filter(Boolean))]
  cat.items.push({ name, price, c: cat.kw, veg: !NONVEG.test(name), q })
})
export const ALL = MENU.flatMap((c) => c.items)
