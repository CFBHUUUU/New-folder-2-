function calculate() {
    const totalPassengers = parseFloat(document.getElementById("totalPassengers").value);
    const passengersPerRow = parseFloat(document.getElementById("passengersPerRow").value);
    const wallThickness = parseFloat(document.getElementById("wallThickness").value);
    const lengthNose = parseFloat(document.getElementById("lengthNose").value);
    const lengthCabin = parseFloat(document.getElementById("lengthCabin").value);
    const lengthTail = parseFloat(document.getElementById("lengthTail").value);
    const speed = parseFloat(document.getElementById("speed").value);
    const centerDistance = parseFloat(document.getElementById("centerDistance").value);
    const seatingArrangement = document.getElementById("seatingArrangement").value; 
    let a, l;
    switch (seatingArrangement) {
        case "اقتصادي":
            a = 0.42; 
            l = 0.05; 
            break;
        case "عادي":
            a = 0.435; 
            l = 0.055; 
            break;
        case "فاخر":
            a = 0.5; 
            l = 0.07; 
            break;
        default:
            a = 0.42; 
            l = 0.05; 
    }

    const A = 0.305;

    const bf =  2 * ((wallThickness/1000) + 0.05) + (a * passengersPerRow) + (l * (passengersPerRow + 2)) + A; 
    const totalRows = (totalPassengers / passengersPerRow);
    const Lc = totalRows * 0.787;
    const Ln = (lengthNose / lengthCabin) * Lc;
    const Lt = (lengthTail / lengthCabin) * Lc;
    const Lf = Lc + Ln + Lt;
    const finenessRatio = Lf / bf;
    const Sf = 3.14 * bf * Lf * (1 - (2 / finenessRatio)**(2/3)) * (1 + (1 / (finenessRatio**2)));
    const Vf = (3.14 / 4) * (bf**2) * Lf * (1 - (2 / finenessRatio));
    const weight = 0.23 * Math.sqrt((speed * ((centerDistance / bf) ** 2)) * (Sf ** 1.2));

    let additionalWeight = 0;
    if (document.getElementById("pressurizedCabin").checked) additionalWeight += weight * 0.08;
    if (document.getElementById("rearEngines").checked) additionalWeight += weight * 0.04;
    if (document.getElementById("mainUC").checked) additionalWeight += weight * 0.07;
    if (document.getElementById("freighterAircraft").checked) additionalWeight += weight * 0.10;

    const totalWeight = weight + additionalWeight;

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = `
        <h2>النتائج</h2>
        <h3>شكرًا على استخدامك لحاسبتنا! نتمنى لك رحلة مميزة في تصميم الطائرة</h3>
        <table>

            <tr>
                <th>الخاصية</th>
                <th>القيمة</th>
                <th>الوحدة</th>
            </tr>
            <tr>
                <td>تصنيف مقاعد الركاب</td>
                <td>${seatingArrangement}</td>
                <td>-</td>
            </tr>
            <tr>
            <td>عدد المقاعد في العمود</td>
            <td>${totalRows.toFixed(3)}</td>
            <td>-</td>
        </tr>
        <tr>
            <td>سرعة الطائرة   Vmax </td>
            <td>${speed}</td>
            <td>متر/ثانية</td>
        </tr>
        <tr>
            <td>المسافة من مركز الجناح إلى مركز الذيل   ℒt </td>
            <td>${centerDistance}</td>
            <td>متر</td>
        </tr>
            <tr>
                <td>العرض الكلي لجسم الطائرة   bf </td>
                <td>${bf}</td>
                <td>متر</td>
            </tr>
            <tr>
                <td>الطول الإجمالي للمقصورة   Lc </td>
                <td>${Lc.toFixed(3)}</td>
                <td>متر</td>
            </tr>
            <tr>
                <td>طول مقدمة الطائرة   Ln </td>
                <td>${Ln.toFixed(3)}</td>
                <td>متر</td>
            </tr>
            <tr>
                <td>طول وحدة الذيل   Lt </td>
                <td>${Lt.toFixed(3)}</td>
                <td>متر</td>
            </tr>
            <tr>
                <td>الطول الإجمالي للطائرة   Lf </td>
                <td>${Lf.toFixed(3)}</td>
                <td>متر</td>
            </tr>
            <tr>
                <td>نسبة طول جسم الطائرة إلى عرض الطائرة   λf </td>
                <td>${finenessRatio.toFixed(3)}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>مساحة جسم الطائرة   Sf </td>
                <td>${Sf.toFixed(3)}</td>
                <td>متر²</td>
            </tr>
            <tr>
                <td>حجم جسم الطائرة   Vf </td>
                <td>${Vf.toFixed(3)}</td>
                <td>متر³</td>
            </tr>
            <tr>
                <td>الوزن الذاتي للطائرة   weight </td>
                <td>${weight.toFixed(3)}</td>
                <td>كيلو غرام</td>
            </tr>
            <tr>
                <td>الوزن المضاف للطائرة   additionalWeight </td>
                <td>${additionalWeight.toFixed(3)}</td>
                <td>كيلو غرام</td>
            </tr>
            <tr>
                <td>الوزن الكلي للطائرة   totalWeight  </td>
                <td>${totalWeight.toFixed(3)}</td>
                <td>كيلو غرام</td>
            </tr>
        </table>
    `;
}
